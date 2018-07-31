import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Blockies from 'react-blockies'
import CircularProgress from '@material-ui/core/CircularProgress';
import Close from '@material-ui/icons/Close'

import AddContactStyles from 'assets/jss/components/addContactDialogStyles.jsx'
import withMobileDialog from '@material-ui/core/withMobileDialog';

class AddContactDialog extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        address: '',
        name: '',
        pubkey: '',
      }
    }

    handleSuccess = () => {
      console.group("New Contact")
      console.log(`Name: ${this.state.name}`)
      console.log(`Address: ${this.state.address}`)
      console.log(`Pub: ${this.state.pubkey}`)
      console.groupEnd()

      this.props.handleNewContact(
          this.state.name,
          this.state.address,
          this.state.pubkey
      )

      this.handleClose()
    }

    // TODO call to check if actual valid address from web3!
    validAddress() {
      return (this.state.address.length == 40 && this.state.address.startsWith('0x'))
    }


    async handleChange(event) {
      await this.setState({[event.target.name]: event.target.value})
    }

    handleClose = () => {
        this.setState({
          address: '',
          name: '',
          pubkey: '',
        })
        this.props.handleDialogClose()
    }


    render() {
      const { classes,show, fullScreen } = this.props;

      let helperText=""
      if (!this.validAddress()) {
        helperText="Invalid Address"
      }

      return (
        <Dialog
          open={show}
          fullScreen={fullScreen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Contact</DialogTitle>
          <DialogContent
            className={classes.content}
          >
            <section className={classes.topRow}>
            <div className={classes.identiContainer}>
              { this.validAddress() &&
                <Blockies
                seed={this.state.address}
                size={8}
                scale={6}
              />
              }
              { !this.validAddress() &&
                  <div className={classes.invalidAddress}>
                    <Close 
                      className={classes.invalidIcon}
                    />
                  </div>
              }
            </div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name='name'
              label="Name"
              type="text"
              onChange={this.handleChange.bind(this)}
              inputProps={{ maxLength:"24" }}
              fullWidth
            />
            </section>
            <TextField
              margin="dense"
              name='address'
              id="address"
              label="Address"
              type="text"
              inputProps={{ maxLength:"40" }}
              helperText={helperText}
              error={!this.validAddress()}
              onChange={this.handleChange.bind(this)}
              fullWidth
            />
            {this.props.pubLoading &&
              <div className={classes.loader}>
                <CircularProgress color="primary" />
              </div>
            }
            {this.props.showPub &&
            <TextField
              margin="dense"
              id="pubkey"
              name="pubkey"
              label="Public Key"
              type="text"
              onChange={this.handleChange.bind(this)}
              fullWidth
            />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSuccess} disabled={!this.validAddress()} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      )
    }
}

AddContactDialog.propTypes = {
  classes: PropTypes.object,
  show: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  handleNewContact: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
}

export default withMobileDialog()(withStyles(AddContactStyles)(AddContactDialog))
