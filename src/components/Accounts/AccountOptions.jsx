import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import pillsStyle from "assets/jss/components/pillsStyle.jsx";

// icons
import { MetaMask, Ledger, Trezor, Keystore } from "components/common/icons.jsx"

class AccountOptions extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
      <div className={classes.container}>
      <div id="navigation-pills">
      <div className={classes.title}>
      <h3>Connect Accounts</h3>
      </div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12} lg={6}>
      <NavPills
      color="primary"
      horizontal={{
        tabsGrid: { xs: 12, sm: 4, md: 4 },
          contentGrid: { xs: 12, sm: 8, md: 8 }
      }}
      tabs={[
        {
          tabButton: "Metamask",
          tabIcon: MetaMask,
          tabContent: (
            <div>
            <span>
            MetaMask is a secure identity vault that allows you to manage your identities across different dApps.
            </span>
            <span>
            Install the browser plugin at <a href="https://metamask.io/">metamask.io</a>.
            </span>
            <hr />
            <span>
            Note: If MetaMask is installed & unlocked, you will be logged in automatically.
            </span>
            </div>
          )
        },
        {
          tabButton: "Ledger",
          tabIcon: Ledger,
          tabContent: (
            <span>
            Connect Ledger Button Here
            </span>
          )
        },
        {
          tabButton: "Trezor",
          tabIcon: Trezor,
          tabContent: (
            <span>
            Connect Trezor Button Here
            </span>
          )
        }
      ]}
      />
      </GridItem>
      </GridContainer>
      </div>
      </div>
      </div>
    );
  }
}

export default withStyles(pillsStyle)(AccountOptions);
