import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import ContactDialog from 'components/Dialogs/ContactDialog.jsx'
import Web3LoaderDialog from 'containers/Dialogs/Web3LoaderDialog.jsx'
import NotificationSlider from 'components/NotificationSlider/NotificationSlider.jsx'

import eToERoutes from "routes/e2e.jsx";
import eToEStyle from "assets/jss/layouts/eToEStyle.jsx";

import image from "assets/img/Ethereum-homestead-background-26.jpg";
import logo from "assets/img/reactlogo.png";
import 'assets/css/global.css';

// TODO remove
import Blockies from 'react-blockies'
import ContactDialogContent from 'components/Contact/DialogContent.jsx'

// TEST
import EthLoader from 'components/EthLoader/Loader.jsx'

const switchRoutes = (
  <Switch>
    {eToERoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })
  }
  </Switch>
);

class App extends React.Component {
  state = {
    mobileOpen: false,
    dialogOpen: false,
  };

  handleDialogToggle = () => {
    this.setState({ dialogOpen: !this.state.dialogOpen })
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if(this.state.mobileOpen){
        this.setState({mobileOpen: false});
      }
    }
  }
  render() {
    const { classes, accounts, messages, ...rest } = this.props;
// width: 48px; height: 48px; border-radius: 50%; overflow: hidden; box-shadow: 0 0 1px 6px #e8e8e8

    // Notifications
    let txNotifications = (
        (Object.keys(messages)).map((value, key) => {
          return (
            <NotificationSlider
              //status="PENDING"
              //status="AWAITING"
              status={messages[value].status}
              order={key}
            />
          )
        })
    )

    let testHeaderSection = {
        'display': 'flex',
        'alignItems': 'center',
        padding: '10px',
    }
    let headerIconStyle = {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      overflow: 'hidden',
      boxShadow: '0 0 1px 6px #e8e8e8',
      margin: '0px 20px',
      '& .identicon': {
        width: '48px !important',
        height: '48px !important',
      }
    }
    let testHeader = (
      <section style={testHeaderSection}>
        <div style={headerIconStyle}>
          <Blockies
            seed="0x2b62150ffbfefddaab1fff0e41378e5b13fdd77f"
            size={8}
            scale={6}
          />
        </div>
        <div>
          Thomas Sellino
        </div>
      </section>
    )

    return (
      <div className={classes.wrapper}>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        <Sidebar
          routes={eToERoutes}
          logoText={"E2E"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="primary"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={eToERoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          }
          <Footer
            version="0.0.1"
          />
          {
            //<button onClick={this.handleDialogToggle}>Dialog</button>
          }
        </div>

      <Web3LoaderDialog />
      <ContactDialog
          onClose={this.handleDialogToggle}
          show={this.state.dialogOpen}
          header={testHeader}
        >
        <ContactDialogContent
            name='Thomas Sellino'
            address='0x1337000000000000000000000000000000001337'
            pubkey='0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e712983719823791832b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
        />
      </ContactDialog>
      <section className={classes.notificationDrawer}>
        {txNotifications}
        <div className={classes.clear}></div>
      </section>
      {
      /*
       *  Test Loader if needed
       *
      <EthLoader
        height='300px'
        width='180px'
        other={{position: 'fixed', bottom: '0', left: '50%', 'z-index': 999}}
      />
      */
      }
      </div>
    );


  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(eToEStyle)(App);
