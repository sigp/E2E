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
import EthLoader from "components/EthLoader/Loader.jsx";

// icons
const Web3LoaderDialog = ({...props}) => {
  const { classes, show, accountStatus } = props;

  // do nothing if our accounts are loaded correctly
  if (!show) {
    return (
      null
    )
  }
  
  let content = { 
    connecting: (
      <div>
        <div className={classes.title}>
            <h2>Loading Accounts... </h2>
        </div>
        <EthLoader width="100px" height="200px" />
      </div>
    ),
    noAccounts: (
      <div>
        <div className={classes.title}>
          <h2>Connect Accounts</h2>
        </div>
          <AccountOptions />
      </div>
    )
  }

  return(
      <div className={classes.darkbg}>
        <div className={classes.dialog}>
            <section className={classes.dialogBody}>
              { accountStatus == "PENDING" && 
                content.connecting 
              }
              { accountStatus != "PENDING" && 
                content.noAccounts
                
              }
            </section>
        </div>
      </div>
  )
}

Web3LoaderDialog.propTypes = {
    show: PropTypes.bool,
    children: PropTypes.node,
}

export default withStyles(Web3LoaderDialogStyles)(Web3LoaderDialog)
