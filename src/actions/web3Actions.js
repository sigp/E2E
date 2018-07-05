
export const WEB3_LOADED = 'WEB3_LOADED';
export const WEB3_FOUND = 'WEB3_FOUND';
export const WEB3_LOADACCOUNTS = 'WEB3_LOADACCOUNTS';

/* 
 * Action creators 
 *
 */
export function loadAccounts(web3) { 

  return function (dispatch) { 
    // start the request
    dispatch({type: WEB3_LOADACCOUNTS});

    return web3.eth.getAccounts()
      .then(
        acc => dispatch({type: WEB3_LOADACCOUNTS, status: 'SUCCESS', value: acc}),
        err => dispatch({type: WEB3_LOADACCOUNTS, status: 'FAIL'}) 
      )
      
  }
}


