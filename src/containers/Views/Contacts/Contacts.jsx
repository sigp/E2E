import { connect } from 'react-redux'
import ContactsView from 'views/Contacts/Contacts.jsx'

const mapStateToProps = state => {
  return {
    contacts: state.contacts.contacts,
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
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsView)
