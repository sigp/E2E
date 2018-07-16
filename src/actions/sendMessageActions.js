
export const SEND_MSG = 'SEND_MSG';

/* 
 * Action creators 
 *
 */

export function sendMessage(contractInstance, recipient, message,account) {

  return function (dispatch) { 

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
