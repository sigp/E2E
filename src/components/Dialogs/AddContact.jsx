import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import withMobileDialog from '@material-ui/core/withMobileDialog';
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
import {checkPubkey} from 'utils/ethereum-helpers.js'
import AddContactStyles from 'assets/jss/components/addContactDialogStyles.jsx'

const DIAGTYPES = {
  add: 0,
  edit: 1
}

class AddContactDialog extends React.Component {
  constructor(props) {
    super(props)

    // Get the initial state template
    let initialState = {
      error: false,                         // Show error state
      pubkeyError: false,                   // If pubkey doesn't match
      address: props.address,               // Address
      name: props.name,                     // Name
      pubkey: props.pubkey,                 // Pubkey
      pubLoading: false,                    // Searching Pubkey State
      pubFound: false,                      // Pubkey found
      showPub: false,                       // Show/Hide pubkey field
      editable: props.editable,             // Add from message is auto filled.
      dialogType: props.dialogType,         // Type = { edit, add }
    }

    // If the pubkey is given
    // Scneario: Add Contact from Messages OR Edit Contact
    if (props.pubkey) {
      initialState.showPub = true
      initialState.pubLoading = false
      this.state = initialState
    } else {
      // Set the initial state
      this.state = initialState
      if (props.address) {
        // Check for the pubkey
        lookupPubkey(props.address)
          .then( (response) => {
            if (response.status != 200) {
              // Error state
              this.setState({pubLoading: false})
              return undefined
            } else {
              return response.json()
            }
          })
          .catch((err) => {
              this.setState({
                pubkey: undefined,
                showPub: true,
                pubFound: false,
                pubLoading: false,
              })
              return
          })
          .then((json) => {
            if ( json === undefined ) {
                this.setState({
                  pubkey: undefined,
                  showPub: false,
                  pubFound: false,
                  pubLoading: false
                })
                return
            }
            if (json.publickey !== undefined) {
                this.setState({
                  pubFound: true,
                  pubkey: json.publickey,
                  showPub: true,
                  pubLoading: false,
                })
            }
          })
          return
      } else {
        this.setState({ pubkey: undefined })
        return
      }
    }

  }

  /**
   * Check new contact validity
   *    1. Check for empty fields
   *    2. Check validity and fields
   *    3. Set error if necessary
   */
  _checkValidNewContact = () => {
    if (
      // invalid name or address
      this.state.name === undefined || this.state.name === '' ||
      this.state.address === undefined || this.state.address === '') {
      this.setState({
        error: true
      })
      return false
    }

    // Check that the valid address
    if (!this._isValidAddress()) {
      console.log("INVALID ADDR")
      this.setState({
        error: true
      })
      return false
    }

    // invalid pubkey
    if(!checkPubkey(this.state.pubkey, this.state.address) 
      || this.state.pubkey === '') {
      this.setState({ pubkeyError: true })
      return false
    }

    // everything is fine
    this.setState({
      error: false,
      pubkeyError: false,
    })

    return true
  }

  /**
   * Handle Add Button Click.
   *    1. Check if contact valid
   *    2. Send contact to prop
   *    - TODO: remove debug prints
   */
  handleSuccess = () => {
      if (!this._checkValidNewContact()) {
        return
      }

      // Debug Prints
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

  /**
   * Handle the close of the dialog.
   *    1. Reset State
   *    2. Call close prop
   */
  _handleClose = () => {
    this.setState({
      address: '',
      name: '',
      pubkey: '',
    })
    this.props.handleDialogClose()
  }


  /**
   * Check validity of address
   *    1. Ensure non empty fields
   *    2. Check web3 valid address
   *    - TODO: update for ENS (find a way to make async work properly!)
   */
  _isValidAddress = () => {
      if(this.state.address === undefined || this.state.address === '') {
        return false
      }

      let addressToAdd = this.state.address

      // Check through web3
      if (this.props.web3.utils.isAddress(addressToAdd)) {
        return true
      }

      // Resolve the ENS if it fits
      // if (addressToAdd.length - addressToAdd.indexOf('.') > 3 && addressToAdd.indexOf('.') > 0) {
      //   try {
      //     let ensAddress = await this.props.ens.resolver(addressToAdd).addr()
      //     return true
      //   }
      //   catch(err) {
      //       return false
      //   }
      // }

      // Else error out
      return false
  }


  /**
    * Pubkey lookup
    *  1. Call API with address
    *  2. Handle Error / Response
    *  3. Update State
    */
  pubKeyLookup = async () => {
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

  /***********************************************************************
   ** Key Press or Handle Events
   ***********************************************************************/

  /**
   * Handle Key Press and Check If Enter has been pressed
   */
  _KeyPressEnter = (event) => {

    if (event.charCode === 13) {
      if (!this._isValidAddress() || !this.state.name) {
        return
      }
      this.handleSuccess()
      return
    }

    return
  }

  /**
   * Handle the change of the name field
   */
  _handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  /**
   * Handle change of Address
   *    - Update State
   *    - Check?
   *    - TODO: ENS
   */
  _handleAddressChange = async (event) => {
    await this.setState({
      address: event.target.value
    })

    if(this._isValidAddress()) {
      // Check pubkey
      this.setState({
        pubLoading: true,
        showPub: false
      })
      this.pubKeyLookup()
    } else {
      this.setState({
        pubLoading: false,
        showPub: false
      })
    }
  }

  /**
   * Handle Change of PubKey
   */
  _handlePubkeyChange = async (event) => {
    await this.setState({
      pubkey: event.target.value
    })

    checkPubkey(this.state.pubkey, this.state.address)
  }

  /***********************************************************************
   ** Render Events and Helpers
   ***********************************************************************/

  /**
   * Render (the behemoth function)
   *    - Each component maps to a state
   *    - Handle change and keypress?
   */
  render = () => {
    // Get the required props for display
    const { classes, show, dialogType, fullScreen } = this.props;

    // Check if we need helper text
    let helperText = ""
    if (!this._isValidAddress() && (this.state.address !== undefined && this.state.address !== '')) {
      helperText = "Invalid Address"
    }

    return (
      <Dialog
        open={show}
        fullScreen={fullScreen}
        onClose={this._handleClose}
        aria-labelledby="form-dialog-title"
      >
        {
          /**
           * Title
           *    - Check what type of dialog
           *    - Show any error messages
           */
        }
        <DialogTitle id="form-dialog-title">
          { dialogType == DIAGTYPES.add &&
              <span> Add Contact </span>
          }
          { dialogType == DIAGTYPES.edit &&
              <span> Edit Contact </span>
          }
          { this.state.error &&
              <section className={classes.errorBar}>
                Invalid Contact
              </section>
          }
          {
          this.state.pubkeyError &&
            <section className={classes.errorBar}>
              Invalid public key for entered address
            </section>
          }
        </DialogTitle>
        {
          /**
           * Content
           *    - Identicon
           *    - Contact Name
           *    - Contact Address
           *    - Pub Key
           */
        }
        <DialogContent
          className={classes.content}
        >

          {
            // Top row identicon
          }
          <section className={classes.topRow}>
          <div className={classes.identiContainer}>
            { this._isValidAddress() &&
              <Blockies
              seed={this.state.address.toLowerCase()}
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
          {
            // Name field
          }
          <TextField
            autoFocus
            margin='dense'
            id='name'
            name='name'
            label='Name'
            type='text'
            onKeyPress={this._KeyPressEnter.bind(this)}
            onChange={this._handleNameChange.bind(this)}
            inputProps={{ maxLength: '24' }}
            value={this.state.name}
            fullWidth
          />
          </section>

          {
            // Address Field
          }
          <TextField
            margin='dense'
            name='address'
            id='address'
            label='Address'
            type='text'
            error={!this._isValidAddress()}
            onKeyPress={this._KeyPressEnter.bind(this)}
            onChange={this._handleAddressChange.bind(this)}
            disabled={!this.state.editable || (dialogType === DIAGTYPES.edit)}
            value={this.state.address}
            fullWidth
          />
          {
            /*********
             * Public Key States
             *********/
          }

          {
            // Public key search - awaiting API
          }

          { this.state.pubLoading &&
              <div className={classes.loader}>
                <CircularProgress color='primary' />
              </div>
          }

          {
            // Public key has finished loading
            //      - FOUND: disabled
          }

          {
            !this.state.pubLoading &&
              this.state.showPub &&
              <TextField
                margin='dense'
                name='pubkey'
                id='pubkey'
                label='Public Key'
                type='text'
                onChange={this._handlePubkeyChange.bind(this)}
                onKeyPress={this._KeyPressEnter.bind(this)}
                disabled={(!this.state.editable || this.state.pubFound || (dialogType == DIAGTYPES.edit))}
                value={this.state.pubkey}
                fullWidth
              />
          }

        </DialogContent>

        {
          /**
           * Actions
           *    - Success (Add)
           *    - Cancel
           */
        }

        <DialogActions>
          <Button onClick={this._handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {this.handleSuccess()}} disabled={!this._isValidAddress() || !this.state.name } color="primary">
            { dialogType === DIAGTYPES.add &&
              <span> Add </span>
            }
            { dialogType === DIAGTYPES.edit &&
              <span> Update </span>
            }
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
  ens: PropTypes.object.isRequired,
  editable: PropTypes.bool,
  dialogType: PropTypes.number.isRequired,
}

export default withMobileDialog()(withStyles(AddContactStyles)(AddContactDialog))
