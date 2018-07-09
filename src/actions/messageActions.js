import { addressTo32Bytes } from 'utils/ethereum-helpers.js'

export const RETRIEVE_MESSAGES = 'RETRIEVE_MESSAGES';

/* 
 * Action creators 
 *
 */

/* Retrieve Messages from Logs. 
 * contractInfo gives the contract and blocknumber for the network
 * we are currently using. These are specified in web3reducer. 
 */
export function retrieveMessages (web3, accounts, contractInfo) { 
  
  return function (dispatch) { 
      dispatch({type: RETRIEVE_MESSAGES});
      return web3.eth.getPastLogs({ 
        address: contractInfo.address, 
        fromBlock: contractInfo.startBlockNumber,
        toBlock: 'latest',
        topics: ['0xb3dbe9e9894ca2c11cb6c80bd0b0bccb9f5b41d612dbeeda0d5474de40b874fe', addressTo32Bytes(accounts[0]), null]
      })
     .then(
       messages => dispatch({type: RETRIEVE_MESSAGES, status: 'SUCCESS', value:  messages}),
       err => {dispatch({type: RETRIEVE_MESSAGES, status: 'FAIL', value: err}) }
     )
  }
}
