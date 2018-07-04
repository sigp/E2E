import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class InputField extends React.Component {
  render() {
    const { classes, title, id} = this.props;
    return (
      <FormControl className={classes.inputFieldContainer}>
        <InputLabel htmlFor={id}>
          { title }
        </InputLabel>
        <Input
          id={id}
        />
      </FormControl>
    );
  }
}

InputField.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default withStyles(styles)(InputField);
