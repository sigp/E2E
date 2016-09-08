/* Cryptographic modules for E2E
*
* Ethereum uses ECDSA keys for signing transactions. Any Ethereum address is a 160 bits of a Keccak256 hash of the EDSCA public key.
* this means that encryption cannot be done with the address alone. We will find the public key from past transactions.
*
* The encryption scheme used is the Eliptic Curve Integrated Encryption Scheme (ECIES). We will import these from bitcore libraries.
*
*/

// RLP encode encrypted messages
var rlp = require('rlp');
// Load Crypto Modules
// This uses ECDH to encrypt/decrypt, not specifically IES, but satisfactory.
var eccrypto = require('eccrypto');
var secp256k1 = require('secp256k1');
var ethJS = require('ethereumjs-util');
ethJS.crypto = require('crypto');
ethJS.scrypt = require('scryptsy');

function privateFromFile(JSONinput, password) {
	var json = (typeof JSONinput === 'object') ? JSONinput : JSON.parse(input.toLowerCase());
	if (json.version !== 3) {
		throw new Error('Not a V3 wallet')
	}
	var derivedKey
	var kdfparams
	if (json.crypto.kdf === 'scrypt') {
		kdfparams = json.crypto.kdfparams
		derivedKey = ethJS.scrypt(new Buffer(password), new Buffer(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen)
	} else if (json.crypto.kdf === 'pbkdf2') {
		kdfparams = json.crypto.kdfparams
		if (kdfparams.prf !== 'hmac-sha256') {
			throw new Error('Unsupported parameters to PBKDF2')
		}
		derivedKey = ethJS.crypto.pbkdf2Sync(new Buffer(password), new Buffer(kdfparams.salt, 'hex'), kdfparams.c, kdfparams.dklen, 'sha256')
	} else {
		throw new Error('Unsupported key derivation scheme')
	}
	var ciphertext = new Buffer(json.crypto.ciphertext, 'hex')
	var mac = ethJS.sha3(Buffer.concat([derivedKey.slice(16, 32), ciphertext]))
	if (mac.toString('hex') !== json.crypto.mac) {
		throw new Error('Key derivation failed - possibly wrong passphrase')
	}
	var decipher = ethJS.crypto.createDecipheriv(json.crypto.cipher, derivedKey.slice(0, 16), new Buffer(json.crypto.cipherparams.iv, 'hex'))
	var result = decipher.update(ciphertext);
  decipher.final();
  return result;
}

// Encoding - RLP
// We want to encode before passing through block chain
// We build a buffer array and RLP encode it

function encodeEncryptedJSON(_encryptedJSON){
  var encoded = [];
  encoded.push(_encryptedJSON['iv']);
  encoded.push(_encryptedJSON['ephemPublicKey']);
  encoded.push(_encryptedJSON['ciphertext']);
  encoded.push(_encryptedJSON['mac']);
  return rlp.encode(encoded);
}

// Decode the rlp encoded encrypted object
function decodeEncryptedJSON(_encodedEncryptedJSON){
  var decodedJSON = {};
  var decoded = rlp.decode(_encodedEncryptedJSON);
  decodedJSON.iv = decoded[0];
  decodedJSON.ephemPublicKey = decoded[1];
  decodedJSON.ciphertext = decoded[2];
  decodedJSON.mac = decoded[3];
  return decodedJSON;
}

// ECIES Implementation of encryption with RLP encoding
// returns a promise of RLP encoded encrypted message
function encryptMessage(_publicKey, _message){
	console.log("here")
	return new Promise(function(resolve,err){
			// Encrypt the message
		  eccrypto.encrypt(_publicKey, Buffer(_message))
				.then(function(encryptedMessage){
					console.log("here too");
					resolve(encodeEncryptedJSON(encryptedMessage));
				})
				.catch(function(err){
					console.log(err);
				});

	});
}

// Returns a promise of decrepted buffer
function decryptMessage(_privateKey, _cipherText){
	var decodedJSON = decodeEncryptedJSON(_cipherText);
  return eccrypto.decrypt(_privateKey, decodedJSON)
}

// Key Conversions
function privateToPublic(_privateKey){
  return secp256k1.publicKeyCreate(_privateKey, false);
}

function publicToAddress(_pubKey, _sanitize) {
  if (_sanitize && (pubKey.length !== 64)) {
    _pubKey = secp256k1.publicKeyConvert(_pubKey, false);
  }
  //Remove the first bit for address.
  var pubKey = _pubKey.slice(1);
  return ethJS.sha3(pubKey).slice(-20)
}

function privateToAddress(_privateKey){
  return publicToAddress(privateToPublic(_privateKey));
}

// Recover public from Hash. (Need original bit so modify ethJS implementation)
function hashToPublic(_hash, _v,_r,_s){
	var signature = Buffer.concat([ethJS.setLength(_r, 32), ethJS.setLength(_s, 32)], 64);
  var recovery = ethJS.bufferToInt(_v) - 27;
  if (recovery !== 0 && recovery !== 1) {
    throw new Error('Invalid signature v value');
  }
  var senderPubKey = secp256k1.recover(_msgHash, signature, recovery);
  return secp256k1.publicKeyConvert(senderPubKey, false);
}

/*
// Testing
var testJSON =  {"address":"76c82f819497e7397dd02b24033fdbe68bc90cea","crypto":{"cipher":"aes-128-ctr","ciphertext":"62d9cc54b475a1be7667e27edeb871e217574476c6518773dcad15f5aa053fad","cipherparams":{"iv":"60965e3962081cafa4c4a98ea0146987"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"95076cfbb7721c72a69c82b239ebd1528df57e781ef9b505577a949003e12590"},"mac":"af1166b3202fd2b85f6d9c77bf2b6431e63315f293783aa28cb5e090672685fb"},"id":"14f4b385-d79d-4afe-9ad0-397576344398","version":3}
var password = "test"

var privateKey = privateFromFile(testJSON, password, true);

console.log("Private Key :", privateKey.toString('hex'));
var publicKey = privateToPublic(privateKey);
console.log("Public Key :", publicKey.toString('hex'))

var address = privateToAddress(privateKey).toString('hex');
console.log("Address Method 1: ", address);
var address = publicToAddress(publicKey).toString('hex');
console.log("Address Method 2: ", address);

function getPrivateKey(_address,_password,_dir = "~/.ethereum"){
  var keyFile = keythereum.importFromFile(_address,_dir);
  return keythereum.recover(_password, keyFile);
}

// Testing Encryption and Encoding
encryptMessage(publicKey, "This is an encrypted message")
  .then(function(encryptedMessage){
		console.log(encryptedMessage);


  console.log("Encrypted Message :",encryptedMessage.toString('hex'));
	// Send through Block Chain

  // console.log(encryptedM)
  decryptMessage(privateKey,encryptedMessage)
  .then(function(decrypted){
    console.log("Decrypted Message: ",decrypted.toString());
  });
});
*/
