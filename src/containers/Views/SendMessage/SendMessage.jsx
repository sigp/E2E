import { connect } from 'react-redux';
import { sendMessage } from 'actions/sendMessageActions.js'

import SendMessagePage from 'views/SendMessage/SendMessage.jsx';

const mapStateToProps = state => {
  return {
   // contacts: state.contacts.contactList, 
    messageStatus: state.messages.status,
    messages : state.messages.messages,
    network: state.web3.contracts[state.web3.network],
    contractInstance: state.web3.contractInstance,
    web3: state.web3.web3,
    account: state.web3.accounts.active,
    currentReply: state.messages.currentReply
  } 
}; 

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (instance, recipient, message, account) => { 
      dispatch(sendMessage(instance, recipient,message, account))
    },
    clearReply: () => {
      dispatch({type: 'CLEAR_REPLY'})
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SendMessagePage)

