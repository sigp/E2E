
import { UPDATE_THEME} from 'actions/appActions';

export const WEB3_LOADED = 'WEB3_LOADED';
export const WEB3_FOUND = 'WEB3_FOUND';
export const WEB3_UPDATE_ACCOUNTS = 'WEB3_UPDATE_ACCOUNTS';
export const WEB3_UPDATE_NETWORK = 'WEB3_UPDATE_NETWORK';
export const WEB3_UPDATE_PROVIDER = 'WEB3_UPDATE_PROVIDER';

/* 
 * Action creators 
 *
 */
export function updateAccounts(web3, updateCheck) { 

  return function (dispatch) { 
    if (!updateCheck) {  // don't show pending on updates
      // start the request
      dispatch({type: WEB3_UPDATE_ACCOUNTS});
    }

    return web3.eth.getAccounts()
      .then(
        acc => dispatch({type: WEB3_UPDATE_ACCOUNTS, status: 'SUCCESS', value: acc}),
        err => dispatch({type: WEB3_UPDATE_ACCOUNTS, status: 'FAIL'}) 
      )
      
  }
}

export function updateNetwork(web3, updateCheck) { 

  return function (dispatch) { 
    if (!updateCheck) {  // don't show pending on updates
      // start the request
      dispatch({type: WEB3_UPDATE_NETWORK});
    }

    return web3.eth.net.getId()
     .then(
       netId => {
         dispatch({type: WEB3_UPDATE_NETWORK, status: 'SUCCESS', value: netId})
         dispatch({type: UPDATE_THEME, value: netId})
       },
       err => dispatch({type: WEB3_UPDATE_NETWORK, status: 'FAIL'}) 
     )
  }
}
