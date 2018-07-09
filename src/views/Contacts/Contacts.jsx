import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ContactList from 'components/Contact/ContactsList.jsx'


// import style from "./style.css";

const ContactsView = (props) => {
  const { classes } = props;
  // TODO remove after testing:
  let testingContacts = [
    {
        contactName: 'Miriam	Holmes',
        address: '0x0000000000000000000000000000000000000000',
        pubkey: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e9f78a987afr9f879f8b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },
    {
        contactName: 'Tony Wallace',
        address: '0x0000000000000000000000000000000000000001',
        pubkey: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e109238012983091832b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },
    {
        contactName: 'Reginald Howdecker',
        address: '0x0000000000000000000000000000000000000002',
        pubkey: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e712983719823791832b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },
    {
        contactName: 'Thomas Sellino',
        address: '0x1337000000000000000000000000000000001337',
        pubkey: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e712983719823791832b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    }
  ]
  return (
    <Card className={classes.card}>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Contacts</h4>
      </CardHeader>
      <CardBody>
      <ContactList
        contacts={testingContacts}  
      />
      </CardBody>
    </Card>
  );
}

export default withStyles()(ContactsView);
//export default ContactsView;
