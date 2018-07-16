import React from 'react'
import classNames from 'classnames'
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
    encryptToggle: true,
    gasUse: "51000",
    recipient: '',
    message: ''
  };

  // update state on-change
  async handleChange(event) { 
    await this.setState({[event.target.name]: event.target.value})
    this.checkGasPrice() 
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
    const { network, contractInstance, account } = this.props; 
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

    let recipient = this.state.recipient;
    let message = this.state.message; 
    this.props.sendMessage(contractInstance, recipient, message, account);
  }

  handleEncryptToggleChange = () => {
    this.setState({ encryptToggle: !this.state.encryptToggle });
  };

  render() {
    const { classes } = this.props;
    
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
              checked={this.state.encryptToggle}
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
              checked={this.state.encryptToggle}
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

export default withStyles(sendMessageStyle)(SendMessagePage);
