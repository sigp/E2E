// Reducers relating to sending messages

import { 
  SEND_MSG
} from 'actions/sendMessageActions';

const initialState = {
  status: '',
  sentMessages: {}, 
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

    default: 
      return state; 
   }
};

export default sendMessageReducer;
