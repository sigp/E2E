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
      console.log(props.name)
      this.state = {
        error: false,
        address: props.address,
        name: props.name,
        pubkey: props.pubkey,
        pubLoading: false,
        pubFound: false,
        showPub: false,
      }

      if (props.pubkey) {
        console.log(props.pubkey)
        this.state = Object.assign( {}, this.state, {
          showPub: true,
          pubLoading: false
        })
      } else {

      // lookup public key
      lookupPubkey(props.address)
        .then( (response) => {
          if (response.status != 200)
            this.setState({pubLoading: false})
          else 
            return response.json()
        })
        .catch((err) => {
          this.setState({
            pubkey: undefined,
            showPub: false,
            pubFound: false,
            pubLoading: false
          })
          return
        })
        .then((json) => { 
          if(json === undefined) {
            this.setState({
              pubkey: undefined,
              showPub: false,
              pubFound: false,
              pubLoading: false
            })
            return
          }

          if (json.publickey !== undefined) {
            alert(json.publickey)
            this.setState({
              pubFound: true,
              pubkey: json.publickey,
              showPub: true,
              pubLoading: false,
            })
          } else {
            this.setState({pubkey: undefined})
          }

          return
        })
      }
    }

    _checkValidNewContact = () => {
      if (
        // name
        this.state.name === undefined || this.state.name === '' ||
        // name
        this.state.address === undefined || this.state.address === '' ||

        // name
        this.state.pubkey === undefined || this.state.pubkey === ''
      ) {
        this.setState({
          error: true,
        })
        return false
      }
      this.setState({
        error: false
      })
      return true
    }

    handleSuccess = () => {
      if (!this._checkValidNewContact()) {
        return
      }
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
      if(this.state.address === undefined) {
        return false
      }
      if (this.state.address.length == 42 && this.state.address.startsWith('0x')) {
        return(this.props.web3.utils.isAddress(this.state.address))
      }

      return(false)
    }


    async handleAddressChange(event) {
      // check if it is a valid address
      //
      await this.setState({ address: event.target.value })
      if (!this._isValidAddress()) {
          await this.setState({
              pubkey: undefined,
              pubLoading: false,
              showPub: false,
              pubFound: false,
            })
        return
      }

      await this.setState({ pubLoading: true })

      // lookup public key
      lookupPubkey(this.state.address)
        .then( (response) => {
          if (response.status != 200)
            this.setState({
              pubLoading: false,
              showPub: true,
            })
          else
            return response.json()
        })
        .then((json) => {
          if(json === undefined) {
            this.setState({
              pubkey: undefined,
              pubLoading: false,
              showPub: true,
              pubFound: false,
            })
            return
          }

          if (json.publickey !== undefined) {
            this.setState({
              pubkey: json.publickey,
              pubFound: true,
            })
          } else {
            this.setState({
              pubkey: undefined
            })
          }

          this.setState({
            pubLoading: false,
            showPub: true,
          })
        })
    }

    async handlePubKeyChange(event) {
      await this.setState({
        pubkey: event.target.value
      })
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
      if (!this._isValidAddress() && this.state.address !== undefined) {
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
          {
          this.state.error &&
          <section className={classes.errorBar}>
            Invalid Contact
          </section>
          }
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
            { this.props.address &&
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
            }
            { !this.props.address &&
            <TextField
              margin="dense"
              name='address'
              id="address"
              label="Address"
              type="text"
              inputProps={{ maxLength:"42" }}
              helperText={helperText}
              error={!this._isValidAddress()}
              onChange={this.handleAddressChange.bind(this)}
              onKeyPress={this._onKeyPress.bind(this)}
              fullWidth
            />
            }
            {this.state.pubLoading &&
              <div className={classes.loader}>
                <CircularProgress color="primary" />
              </div>
            }
            {!this.state.pubLoading &&              // Not loading/searching
                this.state.showPub &&               // Show pub key field
                this.state.pubFound &&               // If it's full -- disable
                this.state.pubkey !== undefined &&  // Make sure not empty
            <TextField
              margin="dense"
              id="pubkey"
              name="pubkey"
              label="Public Key"
              type="text"
              onChange={this.handleChange.bind(this)}
              onKeyPress={this._onKeyPress.bind(this)}
              value={this.state.pubkey}
              disabled={this.state.pubkey !== undefined}
              fullWidth
            />
            }
            {!this.state.pubLoading &&              // Not loading/searching
                this.state.showPub &&               // Show pub key field
                !this.state.pubFound &&              // Pub not found
            <TextField
              margin="dense"
              id="pubkey"
              name="pubkey"
              label="Public Key"
              type="text"
              onChange={this.handlePubKeyChange.bind(this)}
              onKeyPress={this._onKeyPress.bind(this)}
              fullWidth
            />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this._handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {this.handleSuccess()}} disabled={!this._isValidAddress() || !this.state.name } color="primary">
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
