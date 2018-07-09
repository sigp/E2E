import { combineReducers } from 'redux';

import sendMessage from "./sendMessageReducer.js"
import web3 from "./web3Reducer.js"
import app from "./appReducer.js"
import messages from "./messageReducer.js"

export default combineReducers({
  app,
  web3,
  sendMessage,
  messages
  });
