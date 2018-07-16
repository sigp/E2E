import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { withStyles }  from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

const GasCounter = (props) => {
    const { classes, id, gas } = props
    return (
        <section>
          Gas Cost:&nbsp;
        <span id={id}>
          {gas} 
        </span>
        </section>
    )
}

GasCounter.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default GasCounter
