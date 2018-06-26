import React from 'react'
import PropTypes from 'prop-types'
import Close from '@material-ui/icons/Close'

import withStyles from '@material-ui/core/styles/withStyles'

import DialogStyles from 'assets/jss/components/dialogStyle'

const Dialog = ({...props}) => {
  const { classes, onClose, show, header, children } = props;

  if (!show) {
    return (
      null
    )
  }
  return(
      <div>
      <div className={classes.darkbg}
        onClick={onClose}></div>
        <div class={classes.dialog}>
            <header className={classes.dialogHeader}>
                {header}
                <button
                  className={classes.closebutton}
                  onClick={onClose}>
                    <Close />
                  </button>
                  <div className={classes.clear}></div>
            </header>
            <section className={classes.dialogBody}>
            {children}
            </section>
        </div>
      </div>
  )
}

Dialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    header: PropTypes.element.isRequired,
    children: PropTypes.node,
}

export default withStyles(DialogStyles)(Dialog)
