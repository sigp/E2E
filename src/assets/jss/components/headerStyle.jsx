import {
  container,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx";

const headerStyle = theme => ({
  appBar: {
    backgroundColor: "#444" ,//theme.palette.primary[500], //"#c9eaee",
    boxShadow: "none",
    borderBottom: "0",
    marginBottom: "0",
    position: "absolute",
    width: "100%",
    paddingTop: "10px",
    zIndex: '8',
    color: theme.palette.text.primary, //"#555555",
    border: "0",
    //borderRadius: "0",
    padding: "10px 0",
    transition: "all 150ms ease 0s",
    minHeight: "50px",
    display: "block",
    borderBottom: "1px solid #ccc",
  },
  container: {
    ...container,
    minHeight: "50px",
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: "48px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    "&:hover,&:focus": {
      background: "transparent"
    },
    margin: "0",
  },
  appResponsive: {
    marginRight: "25px"
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  }
});

export default headerStyle;
