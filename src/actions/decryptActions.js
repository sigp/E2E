import { getAccounts, decryptMessage } from 'utils/parity.js'

export const PARITY_DECRYPT = 'PARITY_DECRYPT';

/* 
 * Decryption Actions
 *
 */
export function parityDecrypt(parityHost, parityPort) {

  return async function (dispatch, getState) { 

    let { messages } = getState()

    dispatch({type : PARITY_DECRYPT})

    // Attempt to decrypt all messages using the parity client
  
    // loop
    
    let message = messages.messages[0]
    
    // decryptMessage(parityHost, 
/*
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
  }
}

