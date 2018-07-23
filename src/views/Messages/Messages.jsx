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

const MessagesPage = (props) => {
  const { classes, messages, messageStatus } = props;

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
  </div>
  );
}

export default withStyles(messagesStyle)(MessagesPage);
