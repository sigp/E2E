// Reducers relating to messages

import { 
  RETRIEVE_MESSAGES
} from 'actions/messageActions';

const initialState = {
  status: 'UNINITIALISED',
  messages: []
}

const messageReducer = (state = initialState, action) => {
  switch (action.type) { 

    case RETRIEVE_MESSAGES: 
      switch (action.state) {
        case 'FAIL': 
          console.log(action.value)
          return Object.assign({}, state, { status: 'FAIL' })
        case 'PENDING':
          return Object.assign({}, state, { status: 'PENDING' })
        case 'SUCCESS': 
          return Object.assign({}, state, { 
            status: 'SUCESS', 
            messages : action.value
          })
          console.log(action.value);
      }
    default:
      return state;
  }
};


export default messageReducer;
