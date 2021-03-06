import { connect } from 'react-redux'
import ContactsView from 'views/Contacts/Contacts.jsx'

const mapStateToProps = state => {
  return {
    contacts: state.contacts.contacts,
    web3: state.web3.web3,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addContact: (contact) => {
      dispatch({
        type: 'ADD_CONTACT',
        contactName: contact.name,
        contactAddress: contact.address,
        contactPub: contact.pub,
      })
      dispatch({
        type: 'STORE_CONTACTS',
      })
    },
    deleteContact: (address) => {
      dispatch({
        type: 'DELETE_CONTACT',
        address: address,
      })
      dispatch({
        type: 'STORE_CONTACTS',
      })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsView)
