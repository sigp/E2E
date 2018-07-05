import { combineReducers } from 'redux';

import sendMessage from "./sendMessageReducer.js"
import web3 from "./web3Reducer.js"
import app from "./appReducer.js"

export default combineReducers({
  app,
  web3,
  sendMessage
  });
