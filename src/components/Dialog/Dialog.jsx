import React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'

import withStyles from '@material-ui/core/styles/withStyles'

import DialogStyles from 'assets/jss/components/dialogStyle'

const Dialog = ({...props}) => {
  const { classes, onClose, show, title, children } = props;

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
                <h4>{title}</h4>
                <button
                  className={classes.closebutton}
                  onClick={onClose}>
                    <FontAwesome
                      name="window-close"
                      size="2x"
                    />
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
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
}

export default withStyles(DialogStyles)(Dialog)
