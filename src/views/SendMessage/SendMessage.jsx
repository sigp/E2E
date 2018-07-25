import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Hidden from '@material-ui/core/Hidden'
// core components
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import Switch from '@material-ui/core/Switch';
import SendButton from 'components/Buttons/SendButton.jsx'
import InputField from 'components/InputField/InputField.jsx'
import GasCounter from 'components/GasCounter/GasCounter.jsx'
import TextField from '@material-ui/core/TextField';
// styles
import sendMessageStyle from "assets/jss/layouts/sendMessageStyle.jsx";

class SendMessagePage extends React.Component {

  state = { 
    encrypt: true,
    gasUse: "51000",
    recipient: this.props.currentReply,
    message: ''
  };

  // update state on-change
  async handleChange(event) { 
    await this.setState({[event.target.name]: event.target.value})
    this.checkGasPrice() 

    //TODO: Once the correct length has been input, check for public key
    if (this.state.recipient.length === 40 || this.state.recipient.length === 42) {
       // check for correct address
       if (this.props.web3.utils.isAddress(this.state.recipient))  
          this.props.checkForPubKey(this.state.recipient);
   } 

    //TODO: Check for ENS addresses

  }

  checkGasPrice() { 
    const { network, contractInstance, account } = this.props; 

    if (network === undefined || contractInstance.address === null) {
      this.state.gasUse = "network unavailable"
      return
    }

    let recipient = this.state.recipient;
    if (recipient === '') {
      //this.setState({gasUse: "no recipient"})
      recipient = "0x1234567890123456789012345678901234567890"
      //return
    };
     
    // check the recipient checksum address 
    if(!this.props.web3.utils.isAddress(recipient)) {
      this.setState({gasUse: "invalid recipient address"})
      return
    }

    contractInstance.methods.send(recipient, this.state.message)
    .estimateGas({from: account, gas:1e6}, (err, gas) => { 
      if (gas == 1e6){
        this.setState({gasUse:'revert'});
      }
      else
        this.setState({gasUse: gas});
    });
  }

  // creates the sendMessage action
  sendMessage() { 
    const { network, contractInstance, account, recipientPubKey } = this.props; 
    // ensure the recpient address is correct
    if(!this.props.web3.utils.isAddress(this.state.recipient)) {
      alert("Incorrect Address") 
      return
    }

    // ensure the contract is known for this network
    if (network === undefined || contractInstance.address === null) {
      alert("network unavailable");
      return
    }

    if (this.state.encrypt && recipientPubKey === undefined) { 
      alert("A known public key is required to perform encryption.\n Either enter an account that has done a transaction, or enter the public key manually. See help for further details");
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
    const { classes, currentReply } = this.props;
    
    const smallGC = classNames({
      [classes.gasCounter]: true,
      "sm": true
    })

    return (
      <Card className={classes.card}>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>New Message</h4>
        </CardHeader>
        <CardBody>

        <form className={classes.container} noValidate autoComplete="off">
          <div>
          <InputField
            title="Recipient"
            id="to-recipient"
            name="recipient"
            onChange={this.handleChange.bind(this)}
            value={currentReply}
          />
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
            onChange={this.handleChange.bind(this)}
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
