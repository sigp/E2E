import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { withStyles }  from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

function GasCounter(props) {
    // TODO: add the handler to props
    const { classes, id } = props

    return (
        <section>
          Gas Cost:&nbsp;
        <span id={id}>
          12345
        </span>
        </section>
    )
}

GasCounter.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.object.isRequired,
};

export default GasCounter
