import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
// });

class TextFields extends React.Component {
  render() {
    const { classes, title } = this.props;

    return (
        <TextField
          id="multiline-static"
          label={title}
          multiline
          rows="10"
          defaultValue=""
          className={classes.textField}
          margin="normal"
        />
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles()(TextFields);
