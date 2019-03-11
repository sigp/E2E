
import React from "react";
import PropTypes from 'prop-types'
import Blockies from 'react-blockies'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from '@material-ui/core/Hidden'
// styles
import contactStyle from 'assets/jss/components/contactStyle.jsx'
import ethlogo from 'assets/img/ethlogo.png'
import Typography from '@material-ui/core/Typography';

const Contact = ({...props}) => {
  const { contactName, address, pubkey, classes, clickHandler } = props
  return (
      <section 
        className={classes.contactContainer}
        onClick={() => { props.clickHandler(contactName, address, pubkey)}}
      >
          <section className={classes.contactId}>
            <section className={classes.circleHolder}>
              <Blockies
                seed={address.toLowerCase()}
                size={8}
                scale={6}
              />
            </section>
          </section>
          <section className={classes.contactName}>
              <Typography variant="headline">
                  {contactName}
              </Typography>
          </section>
          <Hidden xsDown>
          <section className={classes.bottomRow}>
            <section className={classes.ethlogo} 
                style={{ backgroundImage: "url(" + ethlogo + ")" }}>
            </section>
            <section className={classes.contactAddr}>{address}</section>
          </section>
          </Hidden>
      </section>
  )
}

Contact.propTypes = {
  contactName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  pubkey: PropTypes.string,
  classes: PropTypes.object.isRequired,
  clickHandler: PropTypes.func.isRequired,
}

export default withStyles(contactStyle)(Contact)
