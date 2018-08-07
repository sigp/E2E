import React from 'react'
import PropTypes from 'prop-types'
// Material core
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Contact from 'components/Contact/Contact.jsx'
import ContactListStyles from 'assets/jss/components/contactListStyles.jsx'

class ContactList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes, contacts } = this.props

    let contactItems = []
      Object.keys(contacts).forEach((key) => {
          let c = contacts[key]
          contactItems.push(
          <Contact
            contactName={c.contactName}
            address={key}
            key={key}
            pubkey={c.pubkey}
          />
          )
    })
    return (
      <div className={classes.wrapper}>
      {
        Object.keys(contacts).length > 0 &&
        contactItems
      }
      </div>
    )
  }
}

ContactList.propTypes = {
  classes: PropTypes.object.isRequired,
  contacts: PropTypes.object.isRequired,
}

export default withStyles(ContactListStyles)(ContactList)
