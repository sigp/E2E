import { connect } from 'react-redux';
import App from 'layouts/EtoE/component/app.jsx';

import { retrieveMessages } from 'actions/messageActions.js';

const mapStateToProps = state => {
  return {
    web3Found: state.web3.web3Found,
    accounts: state.web3.accounts.value,
    web3: state.web3.web3,
    network: state.web3.network,
    contracts: state.web3.contracts
//    contactDialogOpen: state.contracts.dialogOpen
  }
}; 

const mapDispatchToProps = dispatch => {
  return {
    getMessages: (web3, accounts, contract) => {
      dispatch(retrieveMessages(web3, accounts, contract));
    }
    /*
    sendMessageHandler: (rawData) => { 
      dispatch(sendMessage(rawData))
      Do nothing for now. 
    }
    */ 
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App)
