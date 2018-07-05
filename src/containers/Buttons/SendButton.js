import { connect } from 'react-redux';
import SendButton from 'components/Buttons/SendButton.jsx';
import { sendMessage } from 'actions/sendMessageActions.js';

const mapStateToProps = state => {return {} }; // do nothing

const mapDispatchToProps = dispatch => {
  return {
    sendMessageHandler: (rawData) => { 
      dispatch(sendMessage(rawData))
    }
  }
}

const SendButtonContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(SendButton)

export default SendButtonContainer 
