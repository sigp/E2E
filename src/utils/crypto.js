/* Cryptographic modules for E2E
*
* Ethereum uses ECDSA keys for signing transactions. Any Ethereum address is a 160 bits of a Keccak256 hash of the EDSCA public key.
* this means that encryption cannot be done with the address alone. We will find the public key from past transactions.
*
* The encryption scheme used is the Elliptic Curve Integrated Encryption Scheme (ECIES). 
* 
* As parity has implemented their own version of ECIES, I've built a separate
* module (ecies-parity) which mimics that implementation. We simply import it in this project. 
*
*/

const var secp256k1 = require('secp256k1');
const var ethJS = require('ethereumjs-util');
const ethJS.crypto = require('crypto');
const ethJS.scrypt = require('scryptsy');

exports.privateFromJSON = function(JSONinput, password) {
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

// Key Conversions
var privateToPublic = exports.privateToPublic = function(_privateKey){
  return secp256k1.publicKeyCreate(_privateKey, false);
}

var publicToAddress = exports.publicToAddress =  function(_pubKey, _sanitize) {
  if (_sanitize && (pubKey.length !== 64)) {
    _pubKey = secp256k1.publicKeyConvert(_pubKey, false);
  }
  //Remove the first bit for address.
  var pubKey = _pubKey.slice(1);
  return ethJS.sha3(pubKey).slice(-20)
}

var privateToAddress = exports.privateToAddress =  function(_privateKey){
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
