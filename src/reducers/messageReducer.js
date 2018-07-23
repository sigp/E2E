// Reducers relating to messages

import { 
  RETRIEVE_MESSAGES,
  UNREAD_MESSAGES,
  REPLY_TO,
  CLEAR_REPLY,
} from 'actions/messageActions';

import {bytesToAddress} from "utils/ethereum-helpers.js";

// use web3 libraries
var Web3 = require('web3')
var web3 = new Web3(); //decoding strings

const initialState = {
  status: 'UNINITIALISED',
  messages: [],
  unreadMsgStatus: 'UNINTIALISED',
  unreadMsgs: 0,
  currentReply: '',
}

const messageReducer = (state = initialState, action) => {
  switch (action.type) { 

    case RETRIEVE_MESSAGES: 
      switch (action.status) {
        case 'FAIL': 
          return Object.assign({}, state, { status: 'FAIL' })
        case 'SUCCESS': 
          let messageObject = processMessageLog(action.value);
          return Object.assign({}, state, { 
            status: 'SUCCESS', 
            messages : messageObject 
          })

        default:
          return Object.assign({}, state, { status: 'PENDING' })
      }

    case UNREAD_MESSAGES: 
      switch (action.status) { 
        case 'FAIL': 
          return Object.assign({}, state, { unreadMsgStatus: 'FAIL' })
        case 'SUCCESS': 
          return Object.assign({}, state, { 
            unreadMsgStatus: 'SUCCESS', 
            unreadMsgs: action.value
          })
         default: 
          return Object.assign({}, state, { unreadMsgStatus: 'PENDING' })
      }

    case REPLY_TO:
      return Object.assign({}, state, {
        currentReply: action.value
      })

    case CLEAR_REPLY:
      return Object.assign({}, state, { currentReply: '', })

    default:
      return state;
  }
};

function processMessageLog(messageLog) { 
  return messageLog.map(log => { 
     return { 
      recipientAddress : bytesToAddress(log.topics[1]),
      senderAddress: bytesToAddress(log.topics[2]),
       sender: bytesToAddress(log.topics[2]),
      // modify this for proper encryption.
      message: web3.eth.abi.decodeParameter("string",log.data)
    }
  });
}

export default messageReducer;
