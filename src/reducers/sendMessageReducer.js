// Reducers relating to sending messages

import { 
  SEND_MSG,
  ENCRYPT_TOGGLE
} from 'actions/sendMessageActions';

const initialState = {
  encrypt: true
}

const sendMessageReducer = (state = initialState, action) => {
  switch (action.type) { 

    case SEND_MSG: 
      return Object.assign({}, state,  {
        rawData: action.rawData
      })

    case ENCRYPT_TOGGLE:
      return Object.assign({}, state,  {
        encrypt: !state.encrypt
      })

    default: 
      return state; 
   }
};

export default sendMessageReducer;
