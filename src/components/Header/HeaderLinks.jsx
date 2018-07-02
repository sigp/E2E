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
// core components
import CustomInput from "components/Custom/CustomInput.jsx";
import Button from "components/Custom/Button.jsx";

import headerLinksStyle from "assets/jss/components/headerLinksStyle";

class HeaderLinks extends React.Component {

  state = {
    open: false,
    open2: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleClick2 = () => {
    this.setState({ open2: !this.state.open2 });
  };

  handleClose2 = () => {
    this.setState({ open2: false });
  };
  render() {
    const { classes, accounts } = this.props;
    const { open, open2 } = this.state;

    // Generate the account list
    let renderedAccountList
    if (typeof(accounts.then) !== "function")
    {
      renderedAccountList = ( 

        accounts.map((value, key) => {
          return (
                <MenuItem
                  key={key}
                  onClick={this.handleClose2}
                  className={classes.dropdownItem}
                >
                  Account: {key},{value}
                </MenuItem>
          )
        })
    )
    } else {
      let acc = ["0x123"]
      renderedAccountList = ( 
        acc.map((value, key) => {
          return (
            <MenuItem
            key={key}
            onClick={this.handleClose2}
            className={classes.dropdownItem}
            >
            Account: {key},{value}
            </MenuItem>
          )
        })
      )
    }
    return (
      <div>
        <Manager className={classes.manager}>
          <Target>
            <Button
              color={window.innerWidth > 959 ? "transparent" : "white"}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-label="Notifications"
              aria-owns={open ? "menu-list" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.buttonLink}
            >
              <Notifications className={classes.icons} />
              <span className={classes.notifications}>5</span>
              <Hidden mdUp>
                <p onClick={this.handleClick} className={classes.linkText}>
                  Notifications
                </p>
              </Hidden>
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={open}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      You have 5 new tasks
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      You're now friend with Andrew
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Another Notification
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Another One
                    </MenuItem>
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
              className={classes.buttonLink}
              onClick={this.handleClick2}
            >
              <Person className={classes.icons} />
              <Hidden mdUp>
                <p className={classes.linkText}>Profile</p>
              </Hidden>
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open2}
            className={
              classNames({ [classes.popperClose]: !open2 }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleClose2}>
              <Grow
                in={open2}
                id="menu-list-2"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    {renderedAccountList}
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

const headerLinks = withStyles(headerLinksStyle)(HeaderLinks);

const mapStateToProps = state => {
  return {
    accounts: state.web3.accounts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // do nothing
    }
}

export default HeaderLinks = connect(
  mapStateToProps,
  mapDispatchToProps)(headerLinks)

