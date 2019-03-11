import { connect } from 'react-redux';
import Web3LoaderDialog from 'components/Dialogs/Web3LoaderDialog.jsx';

import { sendMessage } from 'actions/sendMessageActions.js';

const mapStateToProps = state => {
  let accounts = state.web3.accounts;
  return {
    show: (accounts.status === 'UNKNOWN' || accounts.status === 'PENDING'), 
    web3Found: state.web3.web3Found, 
    accountStatus: accounts.status 
  } 
}; 

const mapDispatchToProps = dispatch => {
  return { }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Web3LoaderDialog)

