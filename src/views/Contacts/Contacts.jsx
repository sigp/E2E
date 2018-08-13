import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ContactList from 'components/Contact/ContactsList.jsx'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import PersonOutline from '@material-ui/icons/PersonOutline'

import contactsPageStyles from 'assets/jss/layouts/contacts.jsx'

import AddContactDialog from 'components/Dialogs/AddContact.jsx'
import ContactDialog from 'components/Dialogs/ContactDialog'
import ContactDialogContent from 'components/Contact/DialogContent.jsx'
// import style from "./style.css";

class ContactsView extends React.Component {

  constructor(props) {
    super(props)

    this.state ={
      addContactDialog: false,
      contactDetails: {},
      contactDialog: false,
    }
  }

  handleAddDialogClose() {
    this.setState({ addContactDialog: false })
  }

  handleAddClick() {
    this.setState({ addContactDialog: true })
  }

  handleDetailDialogClose() {
    this.setState({ contactDialog: false, contactDetails: {} })
  }

  handleContactClick(name, address, pubkey) {
    console.group("Contact")
    console.log(`Name: ${name}`)
    console.log(`address: ${address}`)
    console.log(`pubkey: ${pubkey}`)
    console.groupEnd();
    this.setState({
      contactDialog: true,
      contactDetails: {
        contactName:name,
        address: address,
        pubkey: pubkey,
      }
    })
  }

  handleNewContact = (name, address, pubkey) => {
    this.props.addContact({
      name: name,
      address: address,
      pub: pubkey
    })
  }

  handleDetailClose() {
    this.setState({
      contactDetails: {},
      contactDialog: false
    })
  }

  render() {
    const { classes, contacts } = this.props;
    return (
      <div>
        <Card className={classes.card}>
        <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Contacts</h4>
        </CardHeader>
        <CardBody>
        {Object.keys(contacts).length > 0 &&
          <ContactList
            clickHandler={this.handleContactClick.bind(this)}
            contacts={contacts}
          />
        }
        {Object.keys(contacts).length == 0 &&
        <div className={classes.emptyBody}>
          <div className={classes.placeholderInner}>
            <PersonOutline
              style={{fontSize: 70}}
            />
            <p> You have no contacts</p>
          </div>
        </div>
        }
        <Button variant="fab" color="primary" aria-label="Add" className={classes.button} onClick={this.handleAddClick.bind(this)}>
        <AddIcon />
        </Button>
        </CardBody>
        </Card>
        <AddContactDialog 
          show={this.state.addContactDialog}
          handleDialogClose={this.handleAddDialogClose.bind(this)}
          handleNewContact={this.handleNewContact.bind(this)}
          pubLoading={false}
          showPub={true}
          address=""
          web3={this.props.web3}
        />
        <ContactDialog
            show={this.state.contactDialog}
            onClose={this.handleDetailDialogClose.bind(this)}
            address={this.state.contactDetails.address}
            name={this.state.contactDetails.contactName}
        >
          <ContactDialogContent
              name={this.state.contactDetails.contactName}
              address={this.state.contactDetails.address}
              pubkey={this.state.contactDetails.pubkey}
          />
        </ContactDialog>
      </div>
  );
  }
}

export default withStyles(contactsPageStyles)(ContactsView);
//export default ContactsView;
