import React from 'react'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import withMobileDialog from '@material-ui/core/withMobileDialog';
import classNames from 'classnames'
import Close from '@material-ui/icons/Close'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import DialogStyles from 'assets/jss/components/dialogStyle'
import Blockies from 'react-blockies'
import ContactDialogContent from 'components/Contact/DialogContent.jsx'

class ViewContactDialog extends React.Component {
  constructor(props) {
    super(props)
  }

  render = () => {
    const { classes, show, onClose, fullScreen } = this.props

    return (
      <Dialog
        open={show}
        fullSCreen={fullScreen}
        onClose={onClose}
      >
      <DialogTitle id="form-dialog-title">
          <section className={classes.topIcons}>
            <Button
              className={classes.topButton}
              onClick={onClose}>
                <Close />
            </Button>
            <Button
              className={classes.topButton}
              onClick={() => {this.props.editContact(this.props.address)}}
            >
              <Edit />
            </Button>
            <Button
              className={classes.topButton}
              onClick={() => {this.props.deleteContact(this.props.address)}}
            >
              <Delete />
            </Button>
            <div className={classes.clear}></div>
          </section>
          <section className={classes.contactDialogHeaderStyle}>
            <div className={classes.contactDialogHeaderIconStyle}>
              <Blockies
                seed={this.props.address.toLowerCase()}
                size={8}
                scale={6}
              />
            </div>
            <div>
                {this.props.name}
            </div>
          </section>
        </DialogTitle>
        <DialogContent>
          <ContactDialogContent
            name={this.props.name}
            address={this.props.address}
            pubkey={this.props.pubkey}
          />
        </DialogContent>
      </Dialog>
    )
  }

}


Dialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    address: PropTypes.string,
    name: PropTypes.string,
    deleteContact: PropTypes.func.isRequired,
    children: PropTypes.node,
}

export default withMobileDialog()(withStyles(DialogStyles)(ViewContactDialog))
