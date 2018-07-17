import {
  drawerWidth,
  transition,
  container
} from 'assets/jss/material-dashboard-react.jsx';

const appStyle = theme => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
    background: theme.palette.background.default,
  },
  mainPanel: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    height: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary
  },
  content: {
    marginTop: '70px',
    padding: '30px 15px',
//    minHeight: 'calc(100vh - 123px)'
  },
  container,
  map: {
    marginTop: '70px'
  },
  notificationDrawer: {
    width: '100%',
    overflow: 'hidden',
    position: 'fixed',
    zIndex: '999',
    height: '200px',
    bottom: '0px',
    direction: 'rtl',
    textAlign: 'right',
  },
  clear: {
    clear: 'both',
  },
});

export default appStyle;
