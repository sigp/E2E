import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import Select from 'react-select'
import Creatable from 'react-select/lib/Creatable'
import MenuItem from '@material-ui/core/MenuItem'
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import inputDropdownStyle from 'assets/jss/components/inputDropdownStyle.jsx'

// Input component - handles the text during typing
function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

// Handles the placeholder and design of the input
function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          ref: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
    />
  );
}

// Every option in the select dropdown - rendering
function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      className={props.selectProps.classes.option}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

// Placeholder rendering
function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

// Single value container
function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

// Value once selected
function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

const components = {
  Option,
  Control,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class InputDropDown extends React.Component<*, State>{
  constructor(props) {
    super(props)

    // Set up the contacts map
    let options = props.options.map((value, key) => {
      return {
        id: value.address,
        name: value.contactName
      }
    })

    var selected = undefined

    if (props.initial !== '') {
      selected = {
        id: props.initial,
        name: props.initial,
      }
      options.push(selected)
    }

    this.state = {
      selectedOption: selected,
      options: options
    }

    props.sendChangeHandler({
      target: {
        name: 'recipient',
        value: props.initial
      }
    })
    //this.handleChange({id: props.initial, name: props.initial}, 'create-option')
  }

  isValidNewOption = (inputValue, selectValue, selectOptions) => {
    if (
      inputValue.trim().length === 0 ||
      selectOptions.find(option => option.name === inputValue) ||
      selectOptions.find(option => option.id === inputValue)
    ) {
      return false;
    }
    return true;
  }

  renderOptionLabel = (option) => {
    if ( option.id === option.name ||
          option.name.includes('Address: ')){
      return option.name
    }

    return `${option.name} (${option.id})`
  }

  handleChange = (option, action) => {
      switch(action) {
        case 'select-option':
          this.setState({ selectedOption: option });
          break;
        case 'create-option':
          let options = this.state.options;
          options.push(option);
          this.setState({ selectedOption: option, options });
          break;
        case 'pop-value':
          options = this.state.options;
          this.inputValue = ""
          this.setState({selectedOption: undefined, options: options})
          break;
      }

      // Fix for blank
      if(option.id === undefined) {
        option.id = ''
      }

      this.props.sendChangeHandler({
        target: {
          name: 'recipient',
          value: option.id
        }
      })
  }

  inputChange = (value) => {
      if (value === '') {
        return
      }
      this.props.sendChangeHandler({
        target: {
          name: 'recipient',
          value: value
        }
      })
  }

  render() {

    let { classes } = this.props
    let selectedOption = this.state.selectedOption

    return (
    <div className={classes.container}>
      <Creatable
          classes={classes}
          className={classes.dropdown}
          options={this.state.options}
          getOptionLabel={option => this.renderOptionLabel(option)}
          getOptionValue={option => option.id}
          components={components}
          name={this.props.name}
          value={selectedOption}
          formatCreateLabel={inputValue => `Address: ${inputValue}`}
          getNewOptionData={(inputValue, optionLabel) => ({
            id: inputValue,
            name: optionLabel,
          })}
          placeholder='Recipient'
          onInputChange={(value) => this.inputChange(value)}
          onChange={(option, { action }) => {
            this.handleChange(option, action)
          }}
          isValidNewOption={this.isValidNewOption}
        />
    </div>
    )
  }

}

export default withStyles(inputDropdownStyle)(InputDropDown)