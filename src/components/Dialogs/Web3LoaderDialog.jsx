import React from 'react'
import PropTypes from 'prop-types'
import Close from '@material-ui/icons/Close'

import withStyles from '@material-ui/core/styles/withStyles'

import AccountOptions from "components/Accounts/AccountOptions.jsx";
import Web3LoaderDialogStyles from './web3LoaderDialogStyle'

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import pillsStyle from "assets/jss/components/pillsStyle.jsx";

// icons
import { MetaMask, Ledger, Trezor, Keystore } from "components/common/icons.jsx"
const Web3LoaderDialog = ({...props}) => {
  const { classes, show } = props;

  // do nothing if our accounts are loaded correctly
  if (!show) {
    return (
      null
    )
  }
  return(
      <div className={classes.darkbg}>
        <div class={classes.dialog}>
            <section className={classes.dialogBody}>
              <div className={classes.title}>
              <h2>Connect Accounts</h2>
              </div>
              <AccountOptions />
            </section>
        </div>
      </div>
  )
}

Web3LoaderDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    header: PropTypes.element.isRequired,
    children: PropTypes.node,
}

export default withStyles(Web3LoaderDialogStyles)(Web3LoaderDialog)
