import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SweetAlert from 'sweetalert-react';
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
import DecryptDialogStyles from 'assets/jss/components/decryptDialogStyles.jsx'
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { MetaMask, Parity } from 'components/common/icons.jsx';
import VpnKey from '@material-ui/icons/VpnKey';
import { isHex } from 'utils/ethereum-helpers.js';
import { getClientVersion, getAccounts, unlockAccount } from 'utils/parity.js';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
    {props.children}
    </Typography>
  );
}


class DecryptDialog extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        name: props.name,
        value: 0,
        error: false,
        parityHost: 'http://localhost',
        parityPort: '8545',
        privatekey: '', // remove instantly after decrypting.
        parityClientNotFoundError: false,
        parityAccountNotFoundError: false,
        accountUnlockError: false,
        showRequestAccountPassword: false,
        passwordEntered: false,
        parityAccountPassword: '',
      }
    }

    async handleChange(event) {
      await this.setState({[event.target.name]: event.target.value})
    }

    handleTabChange = (event, value) => {
      this.setState({ value });
    };

    // Check for enter key
    _onKeyPress(event) {
      if (event.charCode === 13) {
        this.handleSuccess()
      }
    }

    _handleClose = () => {
        this.props.handleDialogClose()
    }

    /* Handle decryption through the parity client */
    async handleParityDecryptValidation() {
     const { activeAccount } = this.props;
     let host = {url: this.state.parityHost, port: this.state.parityPort}

     // Check that we can connect to the parity client
     let parityVersion = await getClientVersion(host)
     if (!parityVersion) { // client doesn't exist.
       //show alert and return
       this.setState({parityClientNotFoundError: true})
       return
     }

     // Check that parity has the necessary account
     let accounts = await getAccounts(host);
     let activeAccountIndex = -1;
     if (accounts != false)  {
       activeAccountIndex = accounts.indexOf(activeAccount.toLowerCase())
     }

     if (activeAccountIndex == -1) { // parity doesn't have the current eth account
       this.setState({parityAccountNotFoundError: true})
       return
     }

     // parity exists and has the account, request the password to unlock
      // the account.
     this.setState({showRequestAccountPassword: true})

    }

    async unlockAndDecrypt(accountPassword) {
      // broken sweetalert. Use placeholder for now
      let password = "password";
      this.setState({showRequestAccountPassword :false});

      const { activeAccount } = this.props;
      let host = {url: this.state.parityHost, port: this.state.parityPort}
      let accountUnlocked = await unlockAccount(host, activeAccount, password);

      if (!accountUnlocked) {
         this.setState({accountUnlockError: true})
         return
      }

      //parityDecrypt({ url: this.parityHost, port: this.parityPort } )

    }


    render() {
      const { classes,show, fullScreen, activeAccount } = this.props;
      const { value } = this.state;

      return (
        <Dialog
          open={show}
          fullScreen={fullScreen}
          onClose={this._handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"></DialogTitle>
          {
          this.state.error &&
          <section className={classes.errorBar}>
            Invalid Input
          </section>
          }
          <DialogContent
            className={classes.content}
          >
        <div>
        {
          // Alerts
        }
        <SweetAlert
          show={this.state.parityClientNotFoundError}
          title="Could not connect to a parity client"
          text='Ensure that the "--jsonrpc-cors all" flag is set and the client is running.'
          type="error"
          onConfirm={()=> this.setState({parityClientNotFoundError :false})}
      />
        <SweetAlert
          show={this.state.parityAccountNotFoundError}
          title="Ethereum Account Not Found"
          text={'Ensure that Parity has the ' + activeAccount + ' account imported.'}
          type="error"
          onConfirm={()=> this.setState({parityAccountNotFoundError :false})}
      />
        <SweetAlert
          show={this.state.accountUnlockError}
          title="Incorrect Password"
          type="error"
          onConfirm={()=> this.setState({accountUnlockError:false, showRequestAccountPassword:true})}
      />
        <SweetAlert
          show={this.state.showRequestAccountPassword}
          title="Account Password"
          text={"Enter the ethereum account's password"}
          type="input"
          inputType="password"
          inputPlaceholder="password"
          showCancelButton
          onConfirm={inputValue => {this.unlockAndDecrypt(inputValue)}}
          onCancel={() => {this.setState({showRequestAccountPassword: false})}}
          onEscapeKey={() => {this.setState({showRequestAccountPassword: false})}}
          onOutsideClick={() => {this.setState({showRequestAccountPassword: false})}}
      />


          <AppBar position="static">
            <Tabs
              fullWidth
              value={value}
              onChange={this.handleTabChange}
              scrollable
              scrollButtons="off">
              indicatorColor="primary"
              textColor="white"
              backgroundColor="#fff"
                <Tab icon={Parity} label="Parity" />
                <Tab label="Keystore" />
                <Tab icon={<VpnKey />} label="Private key" />
            </Tabs>
        </AppBar>
         { value === 0 &&
           <TabContainer>
              <div>
                Decrypt messages using a local Parity node (recommended)
              </div>
              <div>
                This method will send a request to a local parity node to decrypt all encrypted messages. For customised nodes, the host and port may be specified.
           </div>
            <TextField
              margin="dense"
              id="host"
              name='parityHost'
              label="Host"
              type="url"
              fullWidth
              onChange={this.handleChange.bind(this)}
              value={this.state.parityHost}
            />
            <TextField
              margin="dense"
              id="port"
              name='parityPort'
              label="Port"
              type="number"
              fullWidth
              onChange={this.handleChange.bind(this)}
              value={this.state.parityPort}
            />
           <Button
              variant="outlined"
              className={classes.button}
              onClick={this.handleParityDecryptValidation.bind(this)}
           >
            Decrypt
           </Button>
          </TabContainer>
         }
         { value === 1 &&
           <TabContainer>
              <div>
                Decrypt messages via a keystore (wallet) file.
              </div>
             <div>
             This is NOT a recommended way to decrypt messages.
             </div>
             <Button variant="outlined" className={classes.button}>
              Select Wallet File...
             </Button>
          </TabContainer>
         }
         { value === 2 &&
           <TabContainer>
              <div>
                Decrypt messages via raw private key.
              </div>
             <div>
             This is NOT a recommended way to decrypt messages.
             </div>
            <TextField
              margin="dense"
              id="privatekey"
              name='privatekey'
              label="Private Key"
              type="text"
              error={!isHex(this.state.privatekey) || this.state.privatekey.length != 64}
              onChange={this.handleChange.bind(this)}
              inputProps={{ maxLength:"64" }}
              fullWidth
            />
            { (isHex(this.state.privatekey) && this.state.privatekey.length === 64 ) &&
              <Button variant="outlined" className={classes.button}>
              Decrypt Messages
              </Button>
            }
          </TabContainer>
        }
        </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this._handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )
    }
}

DecryptDialog.propTypes = {
  classes: PropTypes.object,
  show: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
}

export default withMobileDialog()(withStyles(DecryptDialogStyles)(DecryptDialog))
