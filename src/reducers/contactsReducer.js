// Reducers relating to contacts

import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT
} from 'actions/contactActions'

const initialState = {
  contacts: []
}

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      let contactsUpdate = state.contacts
      contactsUpdate.push({
          contactName: action.contactName,
          address: action.contactAddress,
          pubkey: action.contactPub,
      })
      return Object.assign({}, state, {
        contacts: contactsUpdate,
      })
    default:
      return state;
  }
}

export default contactsReducer
