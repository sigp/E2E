import { combineReducers } from 'redux';

import sendMessage from "./sendMessageReducer.js"
import web3 from "./web3Reducer.js"

export default combineReducers({
  web3,
  sendMessage
  });
