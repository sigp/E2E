import React from 'react'
import classNames from 'classnmaes',
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'


class InputDropDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      items: [],
      selection: '',
    }
  }

  render() {
    let { classes, items, searchKey } = this.props
  }

  InputDropDown.propTypes = {
      classes: PropTypes.object,
      items: PropTypes.object.isRequired,
      searchKey: PropTypes.string.isRequired,
  }
}
