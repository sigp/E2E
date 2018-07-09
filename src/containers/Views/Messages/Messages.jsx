import { connect } from 'react-redux';
import MessagePage from 'views/Messages/Messages.jsx';

const mapStateToProps = state => {
  return {
    messageStatus: state.messages.status,
    messages : state.messages.messages
  } 
}; 

const mapDispatchToProps = dispatch => {
  return { }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MessagePage)

