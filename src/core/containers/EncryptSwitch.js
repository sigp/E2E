import { connect } from 'react-redux';
import { encryptToggle} from '../actions/sendMessageActions.js';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


let EncryptSwitch = ({checked, onChange}) => {
  return (
    <span>Encrypt
       <Switch
      checked={checked}
      onChange={onChange}
        />
    </span>
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
