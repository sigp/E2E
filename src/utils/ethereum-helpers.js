// miscellaneous Ethereum tools  
const keccak = require('keccak');

export function addressTo32Bytes(address) { 
  let padding = '0x000000000000000000000000'
  if (address.length == 42) { // strip the 0x
    return padding + address.substr(2);
  }
  else if (address.length == 40) { 
    return padding + address;
  }
  return '' // incorrect address size
}


export function bytesToAddress(byteString) { 
  return  '0x' + byteString.substr(26);
}

export function checkForCipher(message) { 
  let cipherText = Buffer.from(message, "hex")
  if (cipherText[0] >= 2 && cipherText[0] <= 4)
    return true
  return false
}

export function isHex(s) {
    var regExp = /^[-+]?[0-9A-Fa-f]+\.?[0-9A-Fa-f]*?$/;
    return (typeof s === 'string' && regExp.test(s));
}

export function checkPubkey(pubkey,address) { 
  if (pubkey === undefined || pubkey === '' || address === undefined || address === '')
    return true
  if (!isHex(pubkey))
    return false
  let d = keccak('keccak256');
  d.update(Buffer.from(pubkey, 'hex'))
  let expectedAddress = d.digest('hex').slice(-40)
  return '0x' + expectedAddress == address;
}


