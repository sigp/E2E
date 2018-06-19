import { connect } from 'react-redux';
import { encryptToggle} from '../actions/sendMessageActions.js';
import { encryptToggle } from '../components/sendMessageButton.js'

const mapStateToProps = state => {
  return {
    state
  }

const mapDispatchToProps = dispatch => {
  return {
    onEncryptToggle: () => {
      dispatch(encryptToggle())
    }
  }
}

const sendMessageContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(
