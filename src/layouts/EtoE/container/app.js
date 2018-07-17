import { connect } from 'react-redux';
import App from 'layouts/EtoE/component/app.jsx';

const mapStateToProps = state => {
  return {
    web3Found: state.web3.web3Found,
    accounts: state.web3.accounts.value,
    messages: state.sendMessage.sentMessages,
    web3: state.web3.web3,
    network: state.web3.network,
  }
}; 

const mapDispatchToProps = dispatch => {
  return { }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App)
