// Reducers relating to contacts

import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT
} from 'actions/contactActions'

const initialState = {
  contacts: {}
}

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      let contactsUpdate = state.contacts
      contactsUpdate[action.contactAddress] = {
          contactName: action.contactName,
          pubkey: action.contactPub,
      }
      return Object.assign({}, state, {
        contacts: contactsUpdate,
      })
      break

    default:
      return state
  }
}

export default contactsReducer
