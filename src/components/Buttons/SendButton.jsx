import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Save from '@material-ui/icons/Save'
import Icon from '@material-ui/core/Icon'
import Hidden from '@material-ui/core/Hidden'

// const styles = theme => ({
// });

const SendButton = (props) => {
  const { classes, sendMessageHandler } = props;
  let smallStyle = classNames({
    [classes.button]: true,
    "sm": true,
  })
  return (
      <span>
      <Hidden mdUp>
        <Button variant="contained" color="primary" className={smallStyle} onClick={() => sendMessageHandler("test")}>
          Send
          <Icon className={classes.rightIcon}>send</Icon>
        </Button>
      </Hidden>
      <Hidden smDown>
        <Button variant="contained" color="primary" className={classes.button} onClick={() => sendMessageHandler("test")}>
          Send
          <Icon className={classes.rightIcon}>send</Icon>
        </Button>
      </Hidden>
    </span>
  );
}

SendButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(SendButton);
export default SendButton
