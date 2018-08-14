// Reducers relating to contacts

import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  STORE_CONTACTS,
  RESTORE_CONTACTS,
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
    case STORE_CONTACTS:
      let stringContacts = Buffer.from(
        JSON.stringify(state.contacts)
      ).toString('base64')
      localStorage.setItem('e2e-contacts', stringContacts)
      return state
      break
    case RESTORE_CONTACTS:
      let contacts = action.value
      return Object.assign({}, state, {
        contacts: contacts
      })
      break

    default:
      return state
  }
}

export default contactsReducer
