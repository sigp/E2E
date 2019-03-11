import {
  defaultFont,
  container,
  primaryColor,
  drawerWidth,
} from "assets/jss/material-dashboard-react.jsx";

const footerStyle = theme => ({
  block: {
    color: "inherit",
    padding: "0px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
    ...defaultFont,
    fontWeight: "500",
    fontSize: "12px"
  },
  rightblock: {
    color: "inherit",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
    ...defaultFont,
    fontWeight: "500",
    fontSize: "12px"
  },
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    padding: "0",
    margin: "0",
    fontSize: "14px",
    float: "right!important"
  },
  footer: {
    bottom: "0",
    left: 0,
    right: 0,
    position: 'fixed',
    borderTop: "1px solid " + theme.palette.primary.main, // #ccc",
    padding: "15px 0px 0px",
    zIndex: 999,
    background: theme.palette.background.paper,
    ...defaultFont
  },
  container,
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    paddingTop: "0px",
    width: "auto"
  },
  '@media(max-width: 960px)': {
    footer: {
      left: 0,
      right: 0
    }
  }
});
export default footerStyle;
