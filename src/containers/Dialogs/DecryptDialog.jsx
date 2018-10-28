import { connect } from 'react-redux';
import DecryptDialog from 'components/Dialogs/DecryptDialog.jsx';
import { parityDecrypt } from 'actions/decryptActions.js';

const mapStateToProps = state => {
  return {
    activeAccount: state.web3.accounts.active
    }
};

const mapDispatchToProps = dispatch => {
  return {
    decryptParity: (parityHost, parityPort) => {
        dispatch(parityDecrypt(parityHost, parityPort))
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecryptDialog)

