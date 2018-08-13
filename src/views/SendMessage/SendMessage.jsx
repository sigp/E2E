import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Hidden from '@material-ui/core/Hidden'
import Blockies from 'react-blockies'
// core components
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import Switch from '@material-ui/core/Switch';
import SendButton from 'components/Buttons/SendButton.jsx'
import InputField from 'components/InputField/InputField.jsx'
import GasCounter from 'components/GasCounter/GasCounter.jsx'
import TextField from '@material-ui/core/TextField';
import Close from '@material-ui/icons/Close'
import InputDropdown from 'components/InputDropdown/InputDropdown.jsx'
import { FadeLoader } from 'react-spinners'
import Tick from 'components/common/tickcross/Tick.jsx'
import Cross from 'components/common/tickcross/Cross.jsx'
import SweetAlert from 'sweetalert-react'
import 'sweetalert/dist/sweetalert.css'

// styles
import sendMessageStyle from "assets/jss/layouts/sendMessageStyle.jsx";

class SendMessagePage extends React.Component {

  state = { 
    encrypt: true,
    gasUse: "51000",
    recipient: this.props.currentReply,
    message: '',
    validRecipient: false,
    contacts: this.props.contacts,
    // alert states
    invalidAddressAlert: false,
    networkUnavailableAlert: false,
    pubkeyAlert: false
  };

  // update state on-change
  async handleChange(event, origin) { 
    //TODO: Make this more elegant. Icon to display if public key or not
    //exists.

    await this.setState({[event.target.name]: event.target.value})

    // if the address has a '.' in it with at least 3 letters after it, lets check if there is an ens address
    let recipient = this.state.recipient;
    if (recipient.length - recipient.indexOf('.') > 3 && recipient.indexOf('.') > 0) { 
      try {
        let ensAddress = await this.props.ens.resolver(recipient).addr()
        await this.setState({recipient: ensAddress})
        await this.setState({validRecipient: true});
      }
      catch(err) {} // ENS throws if name not found
    }


    if (origin === 'INPUT') {
      if (this.state.recipient.length === 40 || (this.state.recipient.length === 42 && this.state.recipient.startsWith('0x'))) {
        // check for correct address
        if (this.props.web3.utils.isAddress(this.state.recipient))  {
          this.props.checkForPubKey(this.state.recipient);
          return
        }
      }

      if (this.props.pubkeyStatus != 'NONE')
        this.props.clearPubkeyStatus();
    }

    this.checkGasPrice()
  }

  checkGasPrice() { 
    const { network, contractInstance, account } = this.props; 

    if (network === undefined || contractInstance.address === null) {
      this.state.gasUse = "network unavailable"
      return
    }

    let recipient = this.state.recipient;
    if(this.state.recipient === '') {
      this.setState({validRecipient: false})
      contractInstance.methods.send(
          "0x1234567890123456789012345678901234567890",
          this.state.message
      ).estimateGas({from: account, gas:1e6}, (err, gas) => { 
        if (gas == 1e6){
          this.setState({gasUse:'revert'});
        }
        else
          this.setState({gasUse: gas});
      });
    } else if(!this.props.web3.utils.isAddress(recipient)) {
      this.setState({
        gasUse: "invalid recipient address",
        validRecipient: false,
      })
      return
    } else {
      this.setState({validRecipient: true})
      contractInstance.methods.send(
          recipient,
          this.state.message
      ).estimateGas({from: account, gas:1e6}, (err, gas) => { 
        if (gas == 1e6){
          this.setState({gasUse:'revert'});
        }
        else
          this.setState({gasUse: gas});
      });
    }
  }

  // creates the sendMessage action
  sendMessage() { 
    const { network, contractInstance, account, recipientPubKey } = this.props; 
    // ensure the recpient address is correct
    if(!this.props.web3.utils.isAddress(this.state.recipient)) {
      this.setState({invalidAddressAlert: true})
      return
    }

    // ensure the contract is known for this network
    if (network === undefined || contractInstance.address === null) {
      this.setState({networkUnavailableAlert: true})
      return
    }

    if (this.state.encrypt && recipientPubKey === undefined) { 
      this.setState({pubkeyAlert: true})
      return;
    }

    let recipient = this.state.recipient;
    let message = this.state.message; 
    this.props.sendMessage(contractInstance, recipient, recipientPubKey, message, account, this.state.encrypt);
  }

  handleEncryptToggleChange = () => {
    this.setState({ encrypt: !this.state.encrypt });
  };

  render() {
    const { classes, currentReply, pubkeyStatus } = this.props;
    
    const smallGC = classNames({
      [classes.gasCounter]: true,
      "sm": true
    })

    console.log(this.state.gasUse)
    return (
      <Card className={classes.card}>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>New Message</h4>
        </CardHeader>
        <CardBody>


        <form className={classes.container} noValidate autoComplete="off">
          <div className={classes.recipient}>
          <Hidden xsDown>
          <section className={classes.recipientIconContainer}>
          { this.state.validRecipient &&
            <Blockies
              seed={this.state.recipient.toLowerCase()}
              size={8}
              scale={6}
            />
          }
          { !this.state.validRecipient &&
              <section className={classes.invalidRecipientIcon}>
                <Close />
              </section>
          }
          </section>
          </Hidden>
          <InputDropdown 
            options={
              this.props.contacts
            }
            sendChangeHandler={this.handleChange.bind(this)}
            name="recipient"
            initial={this.state.recipient}
            checkGasPrice={this.checkGasPrice.bind(this)}
      />
      {
      //TODO: Fix this loader
      }
          <FadeLoader 
          sizeUnit={'px'}
          radius={5}
          color={'#777'} 
          loading={pubkeyStatus === 'PENDING'}
          />
      { pubkeyStatus === 'SUCCESS' && 
        <Tick />
      }
      { ( pubkeyStatus === 'NOTFOUND' || pubkeyStatus === 'ERROR') && 
        <Cross />
      }
      {
          // <InputField
          //   title="Recipient"
          //   id="to-recipient"
          //   name="recipient"
          //   onChange={this.handleChange.bind(this)}
          //   value={this.state.recipient}
          //   classes={classes}
          // />
      }
          </div>
          <div>
          <TextField
            id="multiline-static"
            label="Message"
            multiline
            rows="10"
            defaultValue=""
            className={classes.textField}
            margin="normal"
            name="message"
            onChange={(event) => { this.handleChange(event, 'TEXTFIELD')}}
          />
          </div>
          <section>
          <Hidden smDown>
          <div className={classes.gasCounter}>
            <GasCounter
              classes={classes}
              id="gas-counter"
              gas={this.state.gasUse}
            />
          </div>
          <div className={classes.actionContainers}>
            <span>Encrypt
            <Switch 
              color="primary"
              checked={this.state.encrypt}
              onChange={this.handleEncryptToggleChange}
            />
            </span>
            <SendButton
              classes={classes}
              onClick={this.sendMessage.bind(this)}
             />
          </div>
          </Hidden>
          <Hidden mdUp>
            <div className={smallGC}>
              <GasCounter
                classes={classes}
                id="gas-counter"
                gas={this.state.gasUse}
              />
            </div>
            <span>Encrypt
            <Switch 
              color="primary"
              checked={this.state.encrypt}
              onChange={this.handleEncryptToggleChange}
            />
            </span>
            <SendButton
              classes={classes}
              onClick={this.sendMessage.bind(this)}
             />
          </Hidden>
          </section>
          { 
            // Alerts
          } 
          <SweetAlert 
            show={this.state.invalidAddressAlert}
            title="Invalid Address"
            text="The entered recipient address is invalid."
            type="error"
            onConfirm={()=> this.setState({invalidAddressAlert:false})}
        />
          <SweetAlert 
            show={this.state.networkUnavailableAlert}
            title="Network Unavailable"
            text="Please connect to a known ethereum network."
            type="error"
            onConfirm={()=> this.setState({networkUnavailableAlert:false})}
        />
          <SweetAlert 
            show={this.state.pubkeyAlert}
            title="Public Key Not Found"
            text="The public key of the recipient has not been found. This means the account has not done no prior transactions. Either enter a public key manually via contacts, or consider sending an unencrypted message."
            type="error"
            onConfirm={()=> this.setState({pubkeyAlert:false})}
        />
        </form>
        </CardBody>
      </Card>
    );
  }
}

SendMessagePage.proptypes = {
  classes: PropTypes.object,
  currentReply: PropTypes.string.isRequired,
}

export default withStyles(sendMessageStyle)(SendMessagePage);
