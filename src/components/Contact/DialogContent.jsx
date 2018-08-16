import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import LocationOn from '@material-ui/icons/LocationOn'
import VpnKey from '@material-ui/icons/VpnKey'
import contactDialogStyles from 'assets/jss/components/contactDialogStyle.jsx'

const ContactDialogContent = ({...props})  => {

  const { name, address, pubkey, classes } = props

  return (
      <section>
          <h3>Contact Details</h3>
          <div>
              {
                // address
              }
              <div className={classes.detailContainer}>
                <div className={classes.icons}><LocationOn/></div>
                <div className={classes.details}>{address}</div>
              </div>
              {
                // pubkey
              }
              <div className={classes.detailContainer}>
                <div className={classes.icons}><VpnKey /></div>
                <div className={classes.details}>{pubkey}</div>
              </div>
          </div>
      </section>

  )

}

ContactDialogContent.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  pubkey: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(contactDialogStyles)(ContactDialogContent)
