import lookupPubkey from 'utils/pubkeyCollectorConfig.js';
const https = require('https')
const ecies = require('ecies-parity');
export const SEND_MSG = 'SEND_MSG';
export const GET_PUBKEY = "GET_PUBKEY";

/* 
 * Action creators 
 *
 */

export function sendMessage(contractInstance, recipient, pubKey, message, account, encrypt) {

  return async function (dispatch) { 

    // Perform encryption
    if (encrypt) { 
      if (pubKey.length != 128) 
        dispatch({type: SEND_MSG, status: 'ERROR', value: "Invalid public key"});
      // the API removes the required first byte
      pubKey = "04" + pubKey

      // TODO: Extended Error handling here
      message = await ecies.encrypt(Buffer.from(pubKey,'hex'), Buffer.from(message));
      message = message.toString("hex")
    }

    dispatch({type: 'CLEAR_REPLY'})
    dispatch({type: SEND_MSG});
    let txHash = ''
    return contractInstance.methods.send(recipient, message).send({from: account})
      .once('transactionHash', (hash) => {
        txHash = hash; 
        dispatch({type: SEND_MSG, status: 'HASH', value:{
          hash: hash,
          message: message, 
          recipient: recipient}
        })
      })
      .once('receipt', (receipt) => {dispatch({type: SEND_MSG, status: 'RECEIPT', value: {hash: txHash, receipt: receipt}})
      })
    /*
     .once('confirmation', (confirmationNo) => {dispatch({type: SEND_MSG, status: 'CONFIRMATION', value: {hash: txHash, confirmationNo: confirmationNo} })
     })
     */
      .once('error', (err) => {dispatch({type: SEND_MSG, status: 'ERROR', value: {hash: txHash, error: err}})
      })
  }
}

export function checkForPubKey(recipient) {
  return function (dispatch) { 

    dispatch({type: GET_PUBKEY});

    // Call the api
    lookupPubkey(recipient)
      .then( (response) => {
        if (response.status != 200) {
          dispatch({type: GET_PUBKEY, status: 'ERROR'});
          return {}
        }
        return response.json()
      })
      .then((json) => { 
        if (json.publickey === undefined) 
          dispatch({type: GET_PUBKEY,  status: 'NOTFOUND'});
        else
          dispatch({type: GET_PUBKEY, status: 'SUCCESS', value: json.publickey})
      })
  }
}
