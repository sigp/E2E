// Reducers relating to web3

import { 
  WEB3_FOUND,
  WEB3_LOADED
} from 'core/actions/web3Actions';

const initialState = {
  web3Found: false, 
  web3:   undefined,
  accounts: []
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

    default: 
      return state; 
   }
};

export default web3Reducer;
