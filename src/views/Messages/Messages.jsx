import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from '@material-ui/core/Hidden'
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from "components/TextFields/MultiLineText.jsx"
import MessageList from 'components/Messages/MessageList.jsx'
import messagesStyle from 'assets/jss/layouts/messagesStyle.jsx'

const MessagesPage = (props) => {
  const { classes, messages, messageStatus } = props;

  return (
    <div>
      <Hidden xsDown>
      <Card className={classes.card}>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Messages</h4>
        </CardHeader>
        <CardBody >
          { messageStatus === "UNINITIALISED" && 
            <p>You have no messages...</p> // TODO: Make this pretty
          }
          { messageStatus === "PENDING" && 
            <p>Loading Messages...</p> // TODO: Make this pretty
          }
          { messageStatus === "SUCCESS" && 
            <MessageList
              messages={messages}
            />
          }
        </CardBody>
      </Card>
    </Hidden>
    <Hidden smUp>
          <div className={classes.smallBody}>
            <MessageList
              messages={messages}
            />
          </div>
    </Hidden>
  </div>
  );
}

export default withStyles(messagesStyle)(MessagesPage);
