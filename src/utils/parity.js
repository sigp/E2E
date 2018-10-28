// parity specific functions
var request = require('browser-request')

var baseRPCBody = {"jsonrpc": "2.0", "id":1}

/*
 * Get accounts through RPC
 * @param: host object of type {url, port}
 */
export function getAccounts(host) {
  return new Promise(function(resolve,reject) {
    let bodyObj = { ...baseRPCBody, method: "eth_accounts", params: []}
    let requestObj = {
      method: 'POST',
      url: host.url + ':' + host.port,
      json: true,
      body: JSON.stringify(bodyObj)
    }
    function callback(err, response, body) {
      if (err)
        resolve(false)
      if (response.statusCode === 200)
        resolve(body.result)
    }
    request(requestObj, callback)
  })
}

/*
 * Get accounts through RPC
 * @param: host object of type {url, port}
 */
export function unlockAccount(host, account, password) {
  return new Promise(function(resolve,reject) {
    let bodyObj = { ...baseRPCBody, method: "personal_unlockAccount", params: [account, password, null]}
    let requestObj = {
      method: 'POST',
      url: host.url + ':' + host.port,
      json: true,
      body: JSON.stringify(bodyObj)
    }
    function callback(err, response, body) {
      console.log(response)
      if (err)
        resolve(false)
      if (response.statusCode === 200)
        console.log(body)
        if (body.error == undefined) {
          if (body.result == true)
            resolve(true)
        }
        resolve(false)
    }
    request(requestObj, callback)
  })
}


/*
 * Check for parity client
 */
export function getClientVersion(host) {
  return new Promise(function(resolve,reject) {
    let bodyObj = { ...baseRPCBody, method: "parity_versionInfo", params: []}
    let requestObj = {
      method: 'POST',
      url: host.url + ':' + host.port,
      json: true,
      body: JSON.stringify(bodyObj)
    }
    function callback(err, response, body) {
      if (err)
        resolve(false)
      if (response.statusCode === 200) {
        // Perform version checks here if needed
        resolve(body.result.version)
      }
    }
    request(requestObj, callback)
  })
}


// Assume the account have been checked to ensure the parity client
// has the private key

  /*
   * Unlock the account
   */
export function decryptMessage(host, accountPwd, address, msg)  {

  let bodyObjUnlock = { ...baseRPCBody, method: "personal_unlockAccount", params: [address, accountPwd]}
  let requestObjUnlock = {
    method: 'POST',
    url: host.url + ':' + host.port,
    json: true,
    body: JSON.stringify(bodyObjUnlock)
  }

  // Set up the decryption callback
  let bodyObjDecrypt = { ...baseRPCBody, method: "parity_decryptMessage", params: [address, msg]}
  let requestObjDecrypt = {
    method: 'POST',
    url: host.url + ':' + host.port,
    json: true,
    body: JSON.stringify(bodyObjDecrypt)
  }

  // decryption callback
  function callbackDecrypt(err, response, body) {
    if (err)
      console.log(err)
    if (response.ok)
      console.log(body) // Message decrypted
  }

  // Set up the unlock account callback
  function callbackUnlock(err, response, body) {
    if (err)
      console.log(err)
    if (response.ok) {
      console.log(body) // Account is unlocked
      // Once unlocked, decrypt the message
      request(requestObjDecrypt, callbackDecrypt);
    }
  }

  request(requestObjUnlock, callbackUnlock);
}




