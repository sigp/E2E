
import React from "react";
import PropTypes from 'prop-types'
import Blockies from 'react-blockies'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from '@material-ui/core/Hidden'
// styles
import contactStyle from 'assets/jss/components/contactStyle.jsx'

const Contact = ({...props}) => {
  const { classes, contactName, address, pubkey } = props
  return (
      <section className={classes.contactContainer}>
          <section className={classes.contactId}>
            <section className={classes.circleHolder}>
              <Blockies
                seed={address}
                size={12}
              />
            </section>
          </section>
          <section className={classes.contactName}>{contactName}</section>
          <Hidden xsDown>
          <section className={classes.contactAddr}>{address}</section>
          </Hidden>
      </section>
  )
}

Contact.propTypes = {
  contactName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  pubkey: PropTypes.string,
  classes: PropTypes.object.isRequired,
}

export default withStyles(contactStyle)(Contact)
