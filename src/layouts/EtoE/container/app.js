import { connect } from 'react-redux';
import App from 'layouts/EtoE/component/app.jsx';
//import { sendMessage } from 'core/actions/sendMessageActions.js';

const mapStateToProps = state => {
  return {
    web3Found: state.web3.web3Found,
    accounts: state.web3.accounts,
    web3: state.web3.web3 
//    contactDialogOpen: state.contracts.dialogOpen
  }
}; 

const mapDispatchToProps = dispatch => {
  return {
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
