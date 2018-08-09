import { connect } from 'react-redux';
import { sendMessage, checkForPubKey } from 'actions/sendMessageActions.js'

import SendMessagePage from 'views/SendMessage/SendMessage.jsx';

const mapStateToProps = state => {
  return {
    contacts: state.contacts.contacts,
    messageStatus: state.messages.status,
    messages : state.messages.messages,
    network: state.web3.contracts[state.web3.network],
    contractInstance: state.web3.contractInstance,
    web3: state.web3.web3,
    ens: state.web3.ens,
    account: state.web3.accounts.active,
    currentReply: state.messages.currentReply,
    recipientPubKey: state.sendMessage.recipientPubKey
  } 
}; 

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (instance, recipient, message, account) => { 
      dispatch(sendMessage(instance, recipient,message, account))
    },
    clearReply: () => {
      dispatch({type: 'CLEAR_REPLY'})
    },
    checkForPubKey: (recipient) => { 
      dispatch(checkForPubKey(recipient))
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SendMessagePage)

