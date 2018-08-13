import { connect } from 'react-redux';
import MessagePage from 'views/Messages/Messages.jsx';
import { retrieveMessages } from 'actions/messageActions.js';

const mapStateToProps = state => {
  return {
    messageStatus: state.messages.status,
    messages : state.messages.messages,
    contacts: state.contacts.contacts,
    web3: state.web3.web3,
  } 
}; 

const mapDispatchToProps = dispatch => {
  return {
    retrieveMessages : () => { 
      dispatch(retrieveMessages());
    },
    replyTo: (recipient) => {
      dispatch({type: 'REPLY_TO', value: recipient})
    },
    clearReply: () => {
      dispatch({type: 'CLEAR_REPLY'})
    },
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
)(MessagePage)

