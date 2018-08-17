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
        value: 0,
        error: false,
        pubkeyError: false,
        address: props.address,
        name: props.name,
        pubkey: props.pubkey,
        pubLoading: false,
        pubFound: false,
        showPub: false,
        privatekey: '', // remove instantly after decrypting. 
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

    render() {
      const { classes,show, fullScreen } = this.props;
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
              name='host'
              label="Host"
              type="url"
              defaultValue="http://localhost"
              fullWidth
            />
            <TextField
              margin="dense"
              id="port"
              name='port'
              label="Port"
              type="number"
              defaultValue={8545}
              fullWidth
            />
           <Button variant="outlined" className={classes.button}>
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
  handleNewContact: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  address: PropTypes.string,
  web3: PropTypes.object.isRequired,
}

export default withMobileDialog()(withStyles(DecryptDialogStyles)(DecryptDialog))
