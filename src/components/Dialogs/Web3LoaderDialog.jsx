import React from 'react'
import PropTypes from 'prop-types'
import Close from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import withStyles from '@material-ui/core/styles/withStyles'

import AccountOptions from "components/Accounts/AccountOptions.jsx";
import Web3LoaderDialogStyles from './web3LoaderDialogStyle'

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import pillsStyle from "assets/jss/components/pillsStyle.jsx";
import EthLoader from "components/EthLoader/Loader.jsx";
import withMobileDialog from '@material-ui/core/withMobileDialog';

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
      <Dialog
        open={show}
        fullScreen={props.fullScreen}
      >
        <section className={classes.dialogBody}>
          { accountStatus == "PENDING" &&
            content.connecting
          }
          { accountStatus != "PENDING" &&
            content.noAccounts

          }
        </section>
      </Dialog>
  )
}

Web3LoaderDialog.propTypes = {
    show: PropTypes.bool,
    children: PropTypes.node,
    fullscreen: PropTypes.bool,
}

export default withMobileDialog()(withStyles(Web3LoaderDialogStyles)(Web3LoaderDialog))
