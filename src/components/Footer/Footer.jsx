import React from "react";
import PropTypes from "prop-types";
import FontAwesome from 'react-fontawesome'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import footerStyle from "assets/jss/components/footerStyle";

const Footer = ({ ...props }) => {
  const { classes, version } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="/" className={classes.block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/help" className={classes.block}>
                  Help
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
            <a href="https://github.com/sigp/E2E" className={classes.rightblock}>
              {version}&nbsp;
              <FontAwesome
                name="github"
                size="2x"
              />
            </a>
            </ListItem>
          </List>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired,
};

export default withStyles(footerStyle)(Footer);
