
export const WEB3_LOADED = 'WEB3_LOADED';
export const WEB3_FOUND = 'WEB3_FOUND';
export const WEB3_LOADACCOUNTS = 'WEB3_LOADACCOUNTS';
export const WEB3_ACCOUNT_CHECK = 'WEB3_ACCOUNT_CHECK';

/* 
 * Action creators 
 *
 */
export function loadAccounts(web3, updateCheck) { 

  return function (dispatch) { 
    if (!updateCheck) {  // don't show pending on updates
      // start the request
      dispatch({type: WEB3_LOADACCOUNTS});
    }

    return web3.eth.getAccounts()
      .then(
        acc => dispatch({type: WEB3_LOADACCOUNTS, status: 'SUCCESS', value: acc}),
        err => dispatch({type: WEB3_LOADACCOUNTS, status: 'FAIL'}) 
      )
      
  }
}
