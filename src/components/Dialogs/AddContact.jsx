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
import lookupPubkey from 'utils/pubkeyCollectorConfig.js';

import AddContactStyles from 'assets/jss/components/addContactDialogStyles.jsx'
import withMobileDialog from '@material-ui/core/withMobileDialog';

class AddContactDialog extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        address: props.address,
        name: props.name,
        pubkey: props.pubkey,
        pubLoading: true
      }
      // lookup public key
      lookupPubkey(props.address)
        .then( (response) => {
          if (response.status != 200) 
            this.setState({pubLoading: false})
          else 
            return response.json()
        })
        .then((json) => { 
          if (json.publickey !== undefined) 
            this.setState({pubkey: json.publickey})
          this.setState({pubLoading: false})
        })
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

      this._handleClose()
    }

    // TODO call to check if actual valid address from web3!
    _isValidAddress() {
      if (this.state.address.length == 42 && this.state.address.startsWith('0x')) {
        return(this.props.web3.utils.isAddress(this.state.address))
      }

      return(false)
    }


    async handleChange(event) {
      await this.setState({[event.target.name]: event.target.value})
    }

    // Check for enter key
    _onKeyPress(event) {
      if (event.charCode === 13) {
        this.handleSuccess()
      }
    }

    _handleClose = () => {
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
      if (!this._isValidAddress()) {
        helperText="Invalid Address"
        if(!this.state.address.startsWith('0x')) {
          helperText+= " - Address starts with '0x'"
        }
      }

      return (
        <Dialog
          open={show}
          fullScreen={fullScreen}
          onClose={this._handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Contact</DialogTitle>
          <DialogContent
            className={classes.content}
          >
            <section className={classes.topRow}>
            <div className={classes.identiContainer}>
              { this._isValidAddress() &&
                <Blockies
                seed={this.state.address}
                size={8}
                scale={6}
              />
              }
              { !this._isValidAddress() &&
                  <div className={classes.in_isValidAddress}>
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
              onKeyPress={this._onKeyPress.bind(this)}
              fullWidth
            />
            </section>
            <TextField
              margin="dense"
              name='address'
              id="address"
              label="Address"
              type="text"
              inputProps={{ maxLength:"42" }}
              helperText={helperText}
              error={!this._isValidAddress()}
              onChange={this.handleChange.bind(this)}
              onKeyPress={this._onKeyPress.bind(this)}
              disabled={this.props.address}
              fullWidth
              value={this.props.address}
            />
            {this.state.pubLoading &&
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
              onKeyPress={this._onKeyPress.bind(this)}
              value={this.state.pubkey}
              disabled={this.state.pubkey}
              fullWidth
            />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this._handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSuccess} disabled={!this._isValidAddress() || !this.state.name } color="primary">
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
  address: PropTypes.string,
  web3: PropTypes.object.isRequired,
}

export default withMobileDialog()(withStyles(AddContactStyles)(AddContactDialog))
