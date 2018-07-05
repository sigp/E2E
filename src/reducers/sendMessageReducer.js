// Reducers relating to sending messages

import { 
  SEND_MSG
} from 'actions/sendMessageActions';

const initialState = {
  
}

const sendMessageReducer = (state = initialState, action) => {
  switch (action.type) { 

    case SEND_MSG: 
      return Object.assign({}, state,  {
        rawData: action.rawData
      })

    default: 
      return state; 
   }
};

export default sendMessageReducer;
