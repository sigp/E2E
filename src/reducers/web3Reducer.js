// Reducers relating to web3

// import contract details
import contractDetails from 'utils/contractDetails.js';

import { 
  WEB3_FOUND,
  WEB3_LOADED,
  WEB3_UPDATE_ACCOUNTS,
  WEB3_UPDATE_NETWORK,
  WEB3_UPDATE_PROVIDER,
} from 'actions/web3Actions';

const initialState = {
  web3Found: false, 
  web3:   undefined,
  accounts: { 
    status: 'UNKNOWN', 
    value:  [],
    active: '' },
  network: 'UNKNOWN',
  provider: 'UNKNOWN', 
  contracts: contractDetails, 
  contractInstance: undefined
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

    case WEB3_UPDATE_ACCOUNTS: 
      return updateAccountReducer(state, action);

    case WEB3_UPDATE_NETWORK: 
      let networkState = updateNetworkReducer(state, action)
      console.log(networkState)
      if (networkState.network === state.network || networkState.contracts[networkState.network] === undefined)  
        return networkState; 

      // update the contract instance
      let contractAddress = networkState.contracts[networkState.network].address
      let contractObject = new networkState.web3.eth.Contract(networkState.contracts.contractABI, contractAddress)
      return Object.assign({}, networkState, {
        contractInstance: contractObject
      })

    case WEB3_UPDATE_PROVIDER: 
      return Object.assign({}, state,  {
        provider: action.value})

    default: 
      return state; 
   }
};

const updateAccountReducer = (state, action) => { 
  switch (action.status) { 
    case 'FAIL': 
      return Object.assign({}, state,  {
        accounts : {active: '', status: 'FAIL', value: []}
      })

    case 'SUCCESS': 
      if (action.value.length > 0)
        return Object.assign({}, state,  {
          accounts : {status: 'SUCCESS',
                      value: action.value,
                      active: action.value[0]
          }
      })
      else 
        return Object.assign({}, state,  {
          accounts : {status: 'UNKNOWN', value: action.value, active:''}
      })

    case 'ACTIVE':
      return Object.assign({}, state, {
        accounts:{
            status: 'SUCCESS',
            value: state.accounts.value,
            active: action.value,
        }
      })

   default: 
      return Object.assign({}, state,  {
        accounts : {active: '', status: 'PENDING', value: []}
      })
   }
};

const updateNetworkReducer = (state, action) => { 
  switch (action.status) { 
    case 'FAIL': 
      return Object.assign({}, state,  {
        network : 'FAIL' 
      })

    case 'SUCCESS': 
      let curNetwork = 'UNKNOWN'
      switch (action.value) {
        case 1:
          curNetwork = 'MAINNET'
          break
        case 2:
          curNetwork = 'MORDEN'
          break
        case 3:
          curNetwork = 'ROPSTEN'
          break
        case 4:
          curNetwork = 'RINKEBY'
          break
        case 42:
          curNetwork = 'KOVAN'
          break
        default:
          curNetwork = 'UNKNOWN'
      }
      return Object.assign({}, state, {network: curNetwork})

   default: 
      return Object.assign({}, state,  {
        network : 'PENDING'
      })
   }
};

export default web3Reducer;
