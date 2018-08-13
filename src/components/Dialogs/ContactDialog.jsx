import React from 'react'
import PropTypes from 'prop-types'
import Close from '@material-ui/icons/Close'

import withStyles from '@material-ui/core/styles/withStyles'

import DialogStyles from 'assets/jss/components/dialogStyle'
import Blockies from 'react-blockies'
import ContactDialogContent from 'components/Contact/DialogContent.jsx'

const Dialog = ({...props}) => {
  const { classes, onClose, show, address, name, children } = props;

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
                <section className={classes.contactDialogHeaderStyle}>
                  <div className={classes.contactDialogHeaderIconStyle}>
                    <Blockies
                      seed={props.address.toLowerCase()}
                      size={8}
                      scale={6}
                    />
                  </div>
                  <div>
                    {name}
                  </div>
                </section>
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
    address: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
}

export default withStyles(DialogStyles)(Dialog)
