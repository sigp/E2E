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
import AddContactDialog from 'components/Dialogs/AddContact.jsx'
import PersonOutline from '@material-ui/icons/PersonOutline'

import contactsPageStyles from 'assets/jss/layouts/contacts.jsx'

// import style from "./style.css";

class ContactsView extends React.Component {

  constructor(props) {
    super(props)

    this.state ={
      addContactDialog: false,
      contacts: this.props.contacts,
    }
  }

  handleDialogClose() {
    this.setState({ addContactDialog: false })
  }

  handleAddClick() {
    this.setState({ addContactDialog: true })
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
    const { classes, contacts } = this.props;
    // TODO remove after testing:
    return (
      <div>
        <Card className={classes.card}>
        <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Contacts</h4>
        </CardHeader>
        <CardBody>
        {contacts.length > 0 &&
          <ContactList
            contacts={contacts}
          />
        }
        { contacts.length == 0 &&
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
          handleDialogClose={this.handleDialogClose.bind(this)}
          handleNewContact={this.handleNewContact.bind(this)}
          pubLoading={false}
          showPub={true}
          address=""
          web3={this.props.web3}
        />
      </div>
  );
  }
}

export default withStyles(contactsPageStyles)(ContactsView);
//export default ContactsView;
