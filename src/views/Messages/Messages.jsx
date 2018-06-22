import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import EncryptSwitch from "core/containers/EncryptSwitch.js";
import SendButton from "core/containers/SendButton.js"
import TextField from "components/TextFields/MultiLineText.jsx"


import style from "assets/css/messagestyle.css";

function MessagesPage(props) {
  const { classes } = props;
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Messages</h4>
      </CardHeader>
      <CardBody>
      </CardBody>
    </Card>
  );
}

export default withStyles(style)(MessagesPage);
