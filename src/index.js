import React from "react";
import { render} from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
//import "assets/css/material-dashboard-react.css?v=1.3.0";
import indexRoutes from "./routes/index.jsx";
import configureStore from 'store/configureStore';
import { encryptToggle } from "actions/sendMessageActions.js";
import { WEB3_FOUND, WEB3_LOADED, WEB3_ACCOUNT_CHECK, loadAccounts } from 'actions/web3Actions.js';

// material ui colouring and theme
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';

var Web3 = require('web3'); 

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
})

const primary = lightBlue;
const store = configureStore();
const hist = createBrowserHistory();


/* Check for injected web3 */
let web3Found = false;
window.addEventListener('load', function() { 

  if (typeof window.web3 !== 'undefined') { // metamask?
    web3Found = true; 
    var web3 = new Web3(window.web3.currentProvider); 
    store.dispatch({type: WEB3_LOADED, value: web3});
    store.dispatch({type: WEB3_FOUND, value: web3Found});
    store.dispatch(loadAccounts(web3, false));
  }
  startApp()
})

// set up a listener to see if accounts get updated. Metamask doesn't have
// subscribe events yet 
setInterval( () => { 
  let state = store.getState()
  if (state.web3.web3Found) {
    store.dispatch(loadAccounts(state.web3.web3, true));
  }
}, 100000)


function startApp() {
  render(
    <Provider store={store}>
    <MuiThemeProvider theme={theme}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router>
    </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
}
