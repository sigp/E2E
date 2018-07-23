import {
  defaultFont,
  dangerColor,
} from "assets/jss/material-dashboard-react.jsx";

import dropdownStyle from "assets/jss/dropdownStyle.jsx";

const headerLinksStyle = theme => ({
  ...dropdownStyle(theme),
  search: {
    "& > div": {
      marginTop: "0"
    },
    [theme.breakpoints.down("sm")]: {
      margin: "10px 15px !important",
      float: "none !important",
      paddingTop: "1px",
      paddingBottom: "1px",
      padding: "0!important",
      width: "60%",
      marginTop: "40px",
      "& input": {
        color: "#FFFFFF"
      }
    }
  },
  linkText: {
    zIndex: "4",
    ...defaultFont,
    fontSize: "14px",
    margin: "0px"
  },
  buttonLink: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      margin: "10px 15px 0",
      width: "-webkit-fill-available",
      "& svg": {
        width: "24px",
        height: "30px",
        marginRight: "15px",
        marginLeft: "-15px"
      },
      "& > span": {
        justifyContent: "flex-start"
      }
    }
  },
  searchButton: {
    [theme.breakpoints.down("sm")]: {
      top: "-50px !important",
      marginRight: "22px",
      float: "right"
    }
  },
  margin: {
    zIndex: "4",
    margin: "0"
  },
  searchIcon: {
    width: "17px",
    zIndex: "4"
  },
  notifications: {
    zIndex: "4",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      top: "2px",
      border: "1px solid #FFF",
      right: "4px",
      fontSize: "9px",
      background: dangerColor,
      //color: "#FFFFFF",
      minWidth: "16px",
      height: "16px",
      borderRadius: "10px",
      textAlign: "center",
      lineHeight: "16px",
      verticalAlign: "middle",
      display: "block",
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.primary.main,
      
    },
    [theme.breakpoints.down("sm")]: {
      ...defaultFont,
      fontSize: "14px",
      marginRight: "8px"
    }
  },
  manager: {
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    display: "inline-block"
  },
  searchWrapper: {
    [theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available",
      margin: "10px 15px 0",
    },
    display: "inline-block"
  },
  networkButton: {
   
    /* This...
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    */ 
    // Or this:
    color: theme.palette.primary.main,
    
    padding: "11px 20px",
    borderRadius: "8px",
    fontSize:"15px",
    textTransform: "none",
    //fontWeight:"bold",

  },
  identiconHolder: {
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    overflow: 'hidden',
    fontSize: 'initial',

    '& > canvas': {
      height: '25px !important',
      width: '25px !important',
    }
  },
  menuIdenticonContainer: {
    boxSizing: 'content-box !important',
    padding: '0px 10px',
  },
    dropdownItemTitle: {
      height: 'auto',
      background: '#5d5d5d',
      borderBottom: `1px solid ${theme.palette.text.primary}`,
      '&:hover': {
        cursor: 'unset',
        backgroundColor: '#5d5d5d',
        background: '#5d5d5d',
      }
    },
    dropdownItemSubTitle: {
      height: 'auto',
      fontSize: '14px',
      borderTop: `1px solid ${theme.palette.background.default}`,
    },
    currentAccIdenticon: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      overflow: 'hidden',
      margin: '0px 10px 0px 0px',
    },
    currentAccAddress: {

    },
    addAccountContainer: {
      height: 'auto',
      boxSizing: 'content-box',
      padding: '12px 0px 10px',
      background: '#333',
      color: '#ccc',
    },
    addAccount: {
      display: 'block',
      margin: '0 auto',
      padding: '2px',
      border: '1px dashed #888',
      borderRadius: '50%',
      height: '26px',
      width: '26px',
      textAlign: 'center',
    },

    '@media(max-width: 959px)': {
      identiconHolder: {
        marginLeft: '5px',
        marginRight: '15px',
      },
      menuIdenticonContainer: {
        padding: '10px 10px',
      },
      manager: {
        textAlign: 'center',
      },
      networkButton: {
        marginTop: '20px',
      },
    }
});

export default headerLinksStyle;
