// Reducers relating to sending messages

import { 
  SEND_MSG,
  GET_PUBKEY
} from 'actions/sendMessageActions';

const initialState = {
  status: '',
  sentMessages: {}, 
  pubkey: '',
  pubkeyStatus: 'NONE'
}

const sendMessageReducer = (state = initialState, action) => {
  switch (action.type) { 

    case SEND_MSG: 
      switch (action.status) {       
        case 'HASH':
          return Object.assign({}, state,  {
            sentMessages: { ...state.sentMessages,
              [action.value.hash]: {
              status:  'AWAITING',
              message: action.value.message,
              receipt: '',
              recipient: action.value.recipient
              },
            },
            status: 'AWAITING'
          })
        case 'RECEIPT':
          return Object.assign({}, state,  {
            sentMessages: { ...state.sentMessages,
              [action.value.hash]: {
              receipt: action.value.receipt,
              status: 'CONFIRMED'
              }
            },
            status: ''
          })

        /* don't bother with confirmations
        case 'CONFIRMATION':
          return Object.assign({}, state,  {
            sentMessages: { [action.value.hash]: {
              status: 'CONFIRMED'
              }
            }
          })
          */
        default: 
          return Object.assign({}, state,  {
              status:  'PENDING' 
          })
      }

    case GET_PUBKEY:
      switch (action.status) {
        case 'SUCCESS':
          return Object.assign({}, state, { 
            pubkeyStatus: action.status,
            pubkey: action.value
          })

        case 'NOTFOUND':
          return Object.assign({}, state, { 
            pubkeyStatus: action.status,
            pubkey: '' 
          })

        case 'NONE':
          return Object.assign({}, state, { 
            pubkeyStatus: 'NONE',
            pubkey: '' 
          })

        case 'ERROR':
          return Object.assign({}, state, { 
            pubkeyStatus: 'ERROR',
            pubkey: '' 
          })

        default: 
          return Object.assign({}, state,  {
              pubkeyStatus:  'PENDING' 
          })
      }

    default: 
      return state; 
   }
};

export default sendMessageReducer;
