import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Save from '@material-ui/icons/Save';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

function SendButton(props) {
  const { classes, sendMessageHandler } = props;
  return ( 
    <span>
      <Button variant="contained" color="primary" className={classes.button} onClick={() => sendMessageHandler("test")}>
        Send
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
    </span>
  );
}

SendButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SendButton);
