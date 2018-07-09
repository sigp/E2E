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


