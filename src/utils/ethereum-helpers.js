// miscellaneous Ethereum tools  

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
   return (s.length && s.length%2 == 0 && !(isNaN(parseInt(s,16))))
}
