import { connect } from 'react-redux';
import SendMessagePage from 'views/SendMessage/SendMessage.jsx';

const mapStateToProps = state => {
  return {
   // contacts: state.contacts.contactList, 
    messageStatus: state.messages.status,
    messages : state.messages.messages,
    network: state.web3.contracts[state.web3.network],
    contractInstance: state.web3.contractInstance,
    web3: state.web3.web3
  } 
}; 

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SendMessagePage)

