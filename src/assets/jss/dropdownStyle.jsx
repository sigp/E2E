import {
  primaryColor,
  primaryBoxShadow,
  defaultFont
} from "assets/jss/material-dashboard-react.jsx";

const dropdownStyle = theme => ({
    buttonLink: {
        [theme.breakpoints.down('md')]:{
            display: 'flex',
            marginRight: '30px',
            width: 'auto',
        },
    },
    links:{
        width: '20px',
        height: '20px',
        zIndex: '4',
        [theme.breakpoints.down('md')]:{
            display: 'block',
            width: '30px',
            height: '30px',
            color: '#a9afbb',
            marginRight: '15px',
        },
    },
    linkText: {
        zIndex: '4',
        ...defaultFont,
        fontSize: '14px',
    },
    popperClose: {
      pointerEvents: 'none',
    },
    pooperResponsive: {
        [theme.breakpoints.down('md')]: {
            zIndex: '1640',
            position: 'static',
            float: 'none',
            width: 'auto',
            marginTop: '0',
            backgroundColor: 'transparent',
            border: '0',
            WebkitBoxShadow: 'none',
            boxShadow: 'none',
            color: 'black'
        }
    },
    dropdown: {
        borderRadius: '3px',
        // border: '1px solid ' + theme.palette.primary.main,
        boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
        top: '100%',
        zIndex: '1000',
        minWidth: '160px',
        padding: '0 0 5px 0',
        margin: '0',
        fontSize: '14px',
        textAlign: 'left',
        listStyle: 'none',
        backgroundColor: theme.palette.background.paper,
        WebkitBackgroundClip: 'padding-box',
        backgroundClip: 'padding-box',

        '& > ul': {
          padding: '0',
        }
    },
    dropdownItem: {
        ...defaultFont,
        fontSize: '13px',
        padding: '10px 20px',
        margin: '0',
        borderRadius: '2px',
        WebkitTransition: 'all 150ms linear',
        MozTransition: 'all 150ms linear',
        OTransition: 'all 150ms linear',
        MsTransition: 'all 150ms linear',
        transition: 'all 150ms linear',
        //display: 'table',
        tableLayout: 'fixed',
        clear: 'both',
        fontWeight: '400',
        lineHeight: '1.42857143',
        color: theme.palette.text.primary,
        whiteSpace: 'nowrap',
        height: "unset",
        margin: '0px 5px',
        // '&:hover': {
        //     backgroundColor: theme.palette.primary[300],
        //     color: theme.palette.text.primary,
        //     ...primaryBoxShadow,
        // }
    },
    menuIdenticon: {
      width: '25px',
      height: '25px',
      borderRadius: '50%',
      overflow: 'hidden',
      margin: '0px 10px 0px 0px',
      '& > canvas': {
        width: '25px !important',
        height: '25px !important',
      }
    },
    menuItemAddress: {
      display: 'table-cell',
      verticalAlign: 'middle',
    },
});

export default dropdownStyle;
