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


// import style from "./style.css";

function ContactsView(props) {
  const { classes } = props;
  return (
      <Card /> 
  );
}

//export default withStyles(style)(ContactsView);
export default ContactsView;
