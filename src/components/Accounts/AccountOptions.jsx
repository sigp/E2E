import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import pillsStyle from "assets/jss/components/pillsStyle.jsx";

// icons
import { MetaMask, Ledger, Trezor, Keystore, Infura } from "components/common/icons.jsx"

class AccountOptions extends React.Component {
  render() {
    const { classes } = this.props;

    let defaultContent = { 
      metamask: (
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
    ),
    ledger: ( 
      <div> 
        <span> Connect your ledger device and click connect. </span>
        <span> Put Button here </span> 
        <hr />
        <span> This will use infura as the node </span>
      </div>
    ),
    trezor: ( 
      <div> 
        <span> Connect your trezor device and click connect. </span>
        <span> Put Button here </span> 
        <hr />
        <span> This will use infura as the node </span>
      </div>
    ), 
    custom: ( 
      <div> 
        <span> Connect your own node. </span>
        <span> Hostname and RPC ports go here. </span> 
        <span> This will use infura as the node </span>
      </div>
    ), 
    infura: ( 
      <div> 
        <span> Connect via infura and upload your own keys via the accounts tab. </span>
        <span> Connect button here  </span>
      </div>
    ) 
    }



    return (
      <div className={classes.section}>
      <div className={classes.container}>
      <div id="navigation-pills">
      <GridContainer>
      <GridItem xs={12} sm={12} md={12} lg={12}>
      <NavPills
      color="primary"
      horizontal={{
        tabsGrid: { xs: 4, sm: 3, md: 2, lg: 2 },
        contentGrid: { xs: 8, sm: 9, md: 10, lg: 10 }
      }}
      tabs={[
        {
          tabButton: "Metamask",
          tabIcon: MetaMask,
          tabContent: defaultContent.metamask
        },
        {
          tabButton: "Ledger",
          tabIcon: Ledger,
          tabContent: defaultContent.ledger
        },
        {
          tabButton: "Trezor",
          tabIcon: Trezor,
          tabContent: defaultContent.trezor
        },
        
        {
          tabButton: "Infura",
          tabIcon: Infura,
          tabContent: defaultContent.infura
        },
        
        {
          tabButton: "Custom",
          tabIcon: Keystore,
          tabContent: defaultContent.custom
        },
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
