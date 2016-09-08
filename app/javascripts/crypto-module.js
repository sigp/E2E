/* Cryptographic modules for E2E
*
* Ethereum uses ECDSA keys for signing transactions. Any Ethereum address is a 160 bits of a Keccak256 hash of the EDSCA public key.
* this means that encryption cannot be done with the address alone. We will find the public key from past transactions.
*
* The encryption scheme used is the Eliptic Curve Integrated Encryption Scheme (ECIES). We will import these from bitcore libraries.
*
*/

// RLP encode encrypted messages
const var rlp = require('rlp');
// Load Crypto Modules
// This uses ECDH to encrypt/decrypt, not specifically IES, but satisfactory.
const var eccrypto = require('eccrypto');
const var secp256k1 = require('secp256k1');
const var ethJS = require('ethereumjs-util');
const ethJS.crypto = require('crypto');
const ethJS.scrypt = require('scryptsy');

exports.privateFromFile = function(JSONinput, password) {
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

exports.encodeEncryptedJSON = function(_encryptedJSON){
  var encoded = [];
  encoded.push(_encryptedJSON['iv']);
  encoded.push(_encryptedJSON['ephemPublicKey']);
  encoded.push(_encryptedJSON['ciphertext']);
  encoded.push(_encryptedJSON['mac']);
  return rlp.encode(encoded);
}

// Decode the rlp encoded encrypted object
exports.decodeEncryptedJSON = function (_encodedEncryptedJSON){
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
exports.encryptMessage = function(_publicKey, _message){
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
exports.decryptMessage(_privateKey, _cipherText){
	var decodedJSON = decodeEncryptedJSON(_cipherText);
  return eccrypto.decrypt(_privateKey, decodedJSON)
}

// Key Conversions
exports.privateToPublic = function(_privateKey){
  return secp256k1.publicKeyCreate(_privateKey, false);
}

exports.publicToAddress = function(_pubKey, _sanitize) {
  if (_sanitize && (pubKey.length !== 64)) {
    _pubKey = secp256k1.publicKeyConvert(_pubKey, false);
  }
  //Remove the first bit for address.
  var pubKey = _pubKey.slice(1);
  return ethJS.sha3(pubKey).slice(-20)
}

exports.privateToAddress = function(_privateKey){
  return publicToAddress(privateToPublic(_privateKey));
}

// Recover public from Hash. (Need original bit so modify ethJS implementation)
exports.hashToPublic = function(_hash, _v,_r,_s){
	var signature = Buffer.concat([ethJS.setLength(_r, 32), ethJS.setLength(_s, 32)], 64);
  var recovery = ethJS.bufferToInt(_v) - 27;
  if (recovery !== 0 && recovery !== 1) {
    throw new Error('Invalid signature v value');
  }
  var senderPubKey = secp256k1.recover(_msgHash, signature, recovery);
  return secp256k1.publicKeyConvert(senderPubKey, false);
}
