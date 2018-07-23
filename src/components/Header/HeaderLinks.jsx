import React from "react";
import { connect } from 'react-redux';
import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
import Add from "@material-ui/icons/Add"
// core components
import CustomInput from "components/Custom/CustomInput.jsx";
import Button from "components/Custom/Button.jsx";
import Blockies from 'react-blockies'

import headerLinksStyle from "assets/jss/components/headerLinksStyle";


class HeaderLinks extends React.Component {

  state = {
    notificationOpen: false,
    accountOpen: false
  };

  handleNotificationClick = () => {
      this.setState({ notificationOpen: !this.state.notificationOpen });
  };

  handleAccountClick = () => {
      this.setState({ accountOpen: !this.state.accountOpen });
  };

  handleNetworkClick = () => {
      this.setState({ networkOpen: !this.state.networkOpen });
  };

  handleNotificationClose = () => {
      this.setState({ notificationOpen : false });
      this.setState({ accountOpen : false });
  };

  handleAccountClose = () => {
      this.setState({ notificationOpen : false });
      this.setState({ accountOpen : false });
  };

  handleNetworkClose = () => {
      this.setState({ networkOpen : false });
      this.setState({ notificationOpen : false });
      this.setState({ accountOpen : false });
  };

  handleNetwork = network => { 
    this.setState({networkOpen: false});
  };

  infuraAvailableNetworks = [
    'MAINNET',
    'RINKEBY',
    'ROPSTEN',
    'KOVAN'
  ]
  // set default network lists
  renderNetworkList() { 
    const { classes, network }  = this.props;
    return this.infuraAvailableNetworks.map((value,key) => {
      if (network !== value){
        return (
            <MenuItem
              key = {key}
              onClick={this.handleNetwork.bind(this,value)}
              className={classes.networkItem}
            >
              { value }
            </MenuItem>
        )
      }
    })
  }

  // build the notifcation list
  notificationList() { 
    const { classes, unreadMessages, messages } = this.props; 
    if (unreadMessages === 0) {
      return (
        <MenuItem
          button={false}
          className={classes.dropdownItem}
        >
        No unread Messages
        </MenuItem>
      )}
    else { 
      let menulist = []; 
      menulist.push( 
        <MenuItem
          button={false}
          className={classes.dropdownItemTitle}
          key={0}
        >
        Unread Messages
        </MenuItem>
      )
      for(var i =0; i < messages.length && i < 5;i++) { 
        menulist.push(
        <MenuItem
          className={classes.dropdownItem}
          key={i+1}
        >
          {messages[i].sender} 
        </MenuItem>
        )
      }
      if (i === 5) {
        menulist.push(
        <MenuItem
          key={6}
          className={classes.dropdownItem}
        >
        ...
        </MenuItem>
        )}
      menulist.push( 
        <MenuItem
          key={7}
          className={classes.dropdownItemSubTitle}
        >
        Clear Unread Messages 
        </MenuItem>
      )
      return menulist
    }
    
  }


  render() {
    const { classes, accounts, network, provider, unreadMessages } = this.props;
    const { notificationOpen, accountOpen, networkOpen } = this.state;

    let currentAccount = accounts.active.toLowerCase();

    return (
      <div>
        <Manager className={classes.manager}>
          <Target>
            <Button className={classes.networkButton}
              color={window.innerWidth > 959 ? "transparent" : "white"}
//              disabled={ provider === 'INFURA' }
              aria-label="Network"
              aria-owns={networkOpen ? "menu-list" : null}
              aria-haspopup="true"
              onClick={this.handleNetworkClick}
              //className={classes.buttonLink}
            >
            { network }
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={networkOpen}
            className={
              classNames({ [classes.popperClose]: !networkOpen }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleNetworkClose}>
              <Grow
                in={networkOpen}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    { this.renderNetworkList() }
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
        <Manager className={classes.manager}>
          <Target>
            <Button
              color={window.innerWidth > 959 ? "transparent" : "white"}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-label="Notifications"
              aria-owns={notificationOpen ? "menu-list" : null}
              aria-haspopup="true"
              onClick={this.handleNotificationClick}
              className={classes.buttonLink}
            >
              <Notifications className={classes.icons} />
              { unreadMessages > 0 && 
              <span className={classes.notifications}>{unreadMessages}</span>
              }
              <Hidden mdUp>
                <p onClick={this.handleNotificationClick} className={classes.linkText}>
                  Notifications
                </p>
              </Hidden>
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={notificationOpen}
            className={
              classNames({ [classes.popperClose]: !notificationOpen }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleNotificationClose}>
              <Grow
                in={notificationOpen}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    { this.notificationList() } 
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
        <Manager className={classes.manager}>
          <Target>
            <Button
              color={window.innerWidth > 959 ? "transparent" : "white"}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-label="Person"
              className={classNames({
                  [classes.buttonLink]: true,
                  [classes.menuIdenticonContainer]: true,
              })}
              // classNames={classes.buttonLink}
              onClick={this.handleAccountClick}
            >
              { ["PENDING", "UNKNOWN", "FAILURE"].indexOf(accounts.status) >= 0  &&
              <Person className={classes.icons} /> }
              { accounts.status === "SUCCESS" && accounts.value.length > 0 &&
              <div className={classes.identiconHolder}>
                <Blockies
                  seed={accounts.value[0].toLowerCase()}
                  size={8}
                  scale={6}
                />
              </div>
              }
              <Hidden mdUp>
                <p className={classes.linkText}>Profile</p>
              </Hidden>
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={accountOpen}
            className={
              classNames({ [classes.popperClose]: !accountOpen }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleAccountClose}>
              <Grow
                in={accountOpen}
                id="menu-list-2"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    { accounts.status === "PENDING" && 
                      <p> Loading put Spinner here </p> }
                    { accounts.status === "FAILURE" && 
                      <p> Couldnt get accounts </p> }
                    { accounts.status === "UNKNOWN" &&
                      <p> No Accounts Loaded Yet </p> }
                    { accounts.status === "SUCCESS" && accounts.value.length > 0 &&
                      accounts.value.map((value, key) => {
                        // TODO uncomment
                        // if(value !== currentAccount)
                        if (value.toLowerCase() === currentAccount) {
                          return (
                            <MenuItem
                              button={false}
                              key={key}
                              className={classes.dropdownItemTitle}
                            >
                            <section className={classes.currentAccIdenticon}>
                              <Blockies
                                seed={value.toLowerCase()}
                                size={8}
                                scale={6}
                              />
                            </section>
                            <section className={classes.currentAccAddress}>
                              {value}
                            </section>
                            </MenuItem>
                          )
                        }
                        return (
                          <MenuItem
                            key={key}
                            onClick={this.handleAccountClose}
                            className={classes.dropdownItem}
                          >
                          <section className={classes.menuIdenticon}>
                            <Blockies
                              seed={value.toLowerCase()}
                              size={8}
                              scale={6}
                            />
                          </section>
                          <section className={classes.menuItemAddress}>
                            {value}
                          </section>
                          </MenuItem>
                        )
                      })
                   }
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
