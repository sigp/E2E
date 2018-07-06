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
import SendButton from 'containers/Buttons/SendButton.js'
import TextField from 'components/TextFields/MultiLineText.jsx'
import InputField from 'components/InputField/InputField.jsx'
import GasCounter from 'components/GasCounter/GasCounter.jsx'
// styles
import sendMessageStyle from "assets/jss/layouts/sendMessageStyle.jsx";

class SendMessagePage extends React.Component {

  state = { 
    encryptToggle: true
  };

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
            classes={classes}
            title="Recipient"
            id="to-recipient"
          />
          </div>
          <div>
          <TextField
            classes={classes}
            title="Message"
          />
          </div>
          <section>
          <Hidden smDown>
          <div className={classes.gasCounter}>
            <GasCounter
              classes={classes}
              id="gas-counter"
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
              onChange={this.handleChange}
            />
            </span>
            <SendButton
              classes={classes}
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
