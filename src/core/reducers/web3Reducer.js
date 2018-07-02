// Reducers relating to web3

import { 
  WEB3_FOUND,
  WEB3_LOADED,
  WEB3_LOADACCOUNTS
} from 'core/actions/web3Actions';

const initialState = {
  web3Found: false, 
  web3:   undefined,
  accounts: { status: 'UNKNOWN', value:  [] } 
}

const web3Reducer = (state = initialState, action) => {
  switch (action.type) { 

    case WEB3_LOADED: 
      return Object.assign({}, state,  {
        web3: action.value,
        accounts: action.value.eth.getAccounts((err, acc) => {return acc})
      })

    case WEB3_FOUND:
      return Object.assign({}, state,  {
        web3Found: action.value
      })

    case WEB3_LOADACCOUNTS: 
      return loadAccountReducer(state, action)

    default: 
      return state; 
   }
};


const loadAccountReducer = (state, action) => { 

  switch (action.status) { 
    case 'FAIL': 
      return Object.assign({}, state,  {
        accounts : {status: 'FAIL'}
      })

    case 'SUCCESS': 
      return Object.assign({}, state,  {
        accounts : {status: 'SUCCESS', value: action.value}
      })

   default: 
      return Object.assign({}, state,  {
        accounts : {status: 'PENDING'}
      })
   }
};

export default web3Reducer;
