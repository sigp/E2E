export const ADD_CONTACT = 'ADD_CONTACT'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const DELETE_CONTACT = 'DELETE_CONTACT'
export const RESTORE_CONTACTS = 'RESTORE_CONTACTS'
export const STORE_CONTACTS = 'STORE_CONTACTS'

/*
 * Action Creators
 */

export function restoreContacts(){
  return function (dispatch) {
    let contacts = localStorage.getItem('e2e-contacts')
    if (contacts !== null) {
      // load the JSON parsed object
      let parsedContacts = JSON.parse(
        Buffer.from(contacts, 'base64').toString('ascii')
      )

      return dispatch({
          type: 'RESTORE_CONTACTS',
          value: parsedContacts
      })
    }
  }
}
