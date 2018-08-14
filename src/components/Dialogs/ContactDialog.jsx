import React from 'react'
import PropTypes from 'prop-types'
import Close from '@material-ui/icons/Close'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'

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
        <div className={classes.dialog}>
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
                  className={classes.deleteButton}
                  onClick={() => {props.deleteContact(address)}}
                >
                  <Delete />
                </button>
                <button
                  className={classes.deleteButton}
                  onClick={() => {props.editContact(address)}}
                >
                  <Edit />
                </button>
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
    address: PropTypes.string,
    name: PropTypes.string,
    deleteContact: PropTypes.func.isRequired,
    children: PropTypes.node,
}

export default withStyles(DialogStyles)(Dialog)
