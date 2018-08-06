import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from '@material-ui/core/Hidden'
import Drafts from '@material-ui/icons/Drafts'
import Sync from '@material-ui/icons/Sync'
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import MessageList from 'components/Messages/MessageList.jsx'
import messagesStyle from 'assets/jss/layouts/messagesStyle.jsx'

import AddContactDialog from 'components/Dialogs/AddContact.jsx'

class MessagesPage extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      addContactDialog: false,
      currentAdd: '',
    }
  }

  handleDialogClose() {
    this.setState({ addContactDialog: false })
  }

  handleAddClick(addr) {
    this.setState({
      addContactDialog: true,
      currentAdd: addr
    })
    console.log("Setting state to true")
  }

  handleNewContact = (name, address, pubkey) => {
    this.props.addContact({
      name: name,
      address: address,
      pub: pubkey
    })
  }

  render() {

  const { classes, messages, messageStatus, replyTo, clearReply } = this.props;

  // Clear the reply field
  clearReply()

  let content;

  switch(messageStatus) {
    case "UNINITIALISED":
      content = (
        <div className={classes.emptyBody}>
          <div className={classes.placeholderInner}>
            <Drafts
              style={{fontSize: 70}}
            />
            <p> You have no messages... </p>
          </div>
        </div>
      )
      break
    case "PENDING":
      content = (
        <div className={classes.emptyBody}>
          <div className={classes.placeholderInner}>
            <Sync
              style={{fontSize: 70}}
              className={classes.syncIcon}
            />
            <p> Loading Messages... </p>
          </div>
        </div>
      )
      break
    case "SUCCESS":
      if(messages.length == 0) {
        content = (
        <div className={classes.emptyBody}>
          <div className={classes.placeholderInner}>
            <Drafts
              style={{fontSize: 70}}
            />
            <p> You have no messages... </p>
          </div>
        </div>
        )
      } else {
        content = (
        <MessageList
          messages={messages}
          replyAction={replyTo}
          addAction={this.handleAddClick.bind(this)}
        />
        )
      }

    break
  }

  return (
    <div>
      <Hidden xsDown>
      <Card className={classes.card}>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Messages</h4>
        </CardHeader>
        <CardBody >
          { content }
        </CardBody>
      </Card>
    </Hidden>
    <Hidden smUp>
          <div className={classes.smallBody}>
            {content}
          </div>
    </Hidden>
    <AddContactDialog 
      show={this.state.addContactDialog}
      handleDialogClose={this.handleDialogClose.bind(this)}
      handleNewContact={this.handleNewContact.bind(this)}
      pubLoading={false}
      showPub={true}
      address={this.state.currentAdd}
    />
  </div>
  );
  }
}

export default withStyles(messagesStyle)(MessagesPage);
