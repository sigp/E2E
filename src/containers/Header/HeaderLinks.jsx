import { connect } from 'react-redux';
import HeaderLinks from 'components/Header/HeaderLinks.jsx';

const mapStateToProps = state => {
  return {
    accounts: state.web3.accounts,
    network: state.web3.network,
    provider: state.web3.provider
  } 
}; 

const mapDispatchToProps = dispatch => {
  return { }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(HeaderLinks)

