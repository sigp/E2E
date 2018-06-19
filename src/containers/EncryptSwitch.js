import { connect } from 'react-redux';
import { encryptToggle} from '../actions/sendMessageActions.js';
import React from 'react';
import Switch from '@material-ui/core/Switch';

let EncryptSwitch = ({checked, onChange}) => {
  return (
    <div>
    <Switch
      checked={checked}
      onChange={onChange}
    />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    checked: state.sendMessage.encrypt 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: () => {
      dispatch(encryptToggle())
    }
  }
}

EncryptSwitch = connect(
  mapStateToProps, 
  mapDispatchToProps)(EncryptSwitch)

export default EncryptSwitch
