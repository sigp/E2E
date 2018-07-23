import { connect } from 'react-redux';
import HeaderLinks from 'components/Header/HeaderLinks.jsx';
import { retrieveMessages } from 'actions/messageActions'

const mapStateToProps = state => {
  return {
    accounts: state.web3.accounts,
    network: state.web3.network,
    provider: state.web3.provider,
    unreadMessages: state.messages.unreadMsgs,
    messages: state.messages.messages
  } 
}; 

const mapDispatchToProps = dispatch => {
  return { 
    updateActive: (acc) => {
      dispatch({
        type: 'WEB3_UPDATE_ACCOUNTS',
        status: 'ACTIVE',
        value: acc
      })
      dispatch(retrieveMessages())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderLinks)

