import { addressTo32Bytes } from 'utils/ethereum-helpers.js';
import { getAccounts } from 'utils/parity.js';

export const RETRIEVE_MESSAGES = 'RETRIEVE_MESSAGES';
export const UNREAD_MESSAGES = 'UNREAD_MESSAGES';
export const REPLY_TO = 'REPLY_TO';
export const CLEAR_REPLY = 'CLEAR_REPLY';
export const PARITY_DECRYPT = 'PARITY_DECRYPT';

/* 
 * Action creators 
 *
 */

/* Retrieve Messages from Logs. 
 * contractInfo gives the contract and blocknumber for the network
 * we are currently using. These are specified in web3reducer. 
 */
export function retrieveMessages () {

  return function (dispatch, getState) { 
    let { web3 } = getState()
    let account = web3.accounts.active
    let contractInfo = web3.contracts[web3.network]
    let contractInstance = web3.contractInstance
    web3 = web3.web3

    dispatch({type: RETRIEVE_MESSAGES});
    dispatch({type: UNREAD_MESSAGES});

    contractInstance.methods.balanceOf(account).call()  
      .then(
        unreadMsgs => dispatch({type: UNREAD_MESSAGES, status: 'SUCCESS', value: unreadMsgs}),
        err => {dispatch({type: UNREAD_MESSAGES, status: 'FAIL', value: err}) }
      )

    return web3.eth.getPastLogs({ 
      address: contractInfo.address, 
      fromBlock: contractInfo.startBlockNumber,
      toBlock: 'latest',
      topics: ['0xb3dbe9e9894ca2c11cb6c80bd0b0bccb9f5b41d612dbeeda0d5474de40b874fe', addressTo32Bytes(account), null]
    })
      .then(
        messages => dispatch({type: RETRIEVE_MESSAGES, status: 'SUCCESS', value:  messages.reverse()}),
        err => {dispatch({type: RETRIEVE_MESSAGES, status: 'FAIL', value: err}) }
      )
  }
}

/* Decrypt Messages via Parity node
 * This will request a parity node to decrypt the currently encrypted
 * messages in the state. 
 * @param host: Object containing the host url and port, eg {url:
 * http://localhost, port: 8545}
 */
export function parityDecrypt(host) { 
  
  return function (dispatch, getState) { 

    // check that the account needed exists on the parity node 
    
    getAccounts(host)

  }
}




