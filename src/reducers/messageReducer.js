// Reducers relating to messages

import { 
  RETRIEVE_MESSAGES
} from 'actions/messageActions';

import {bytesToAddress} from "utils/ethereum-helpers.js";

// use web3 libraries
var Web3 = require('web3')
var web3 = new Web3(); //decoding strings

const initialState = {
  status: 'UNINITIALISED',
  messages: []
}

const messageReducer = (state = initialState, action) => {
  switch (action.type) { 

    case RETRIEVE_MESSAGES: 
      switch (action.status) {
        case 'FAIL': 
          return Object.assign({}, state, { status: 'FAIL' })
        case 'SUCCESS': 
          let messageObject = processMessageLog(action.value);
          console.log(messageObject);
          return Object.assign({}, state, { 
            status: 'SUCCESS', 
            messages : messageObject 
          })

        default:
          return Object.assign({}, state, { status: 'PENDING' })
      }
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
