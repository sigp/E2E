import React from "react";
import { render} from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
//import "assets/css/material-dashboard-react.css?v=1.3.0";
import indexRoutes from "./routes/index.jsx";
import configureStore from 'store/configureStore';
import E2EThemeProvider from 'containers/Themes/ThemeProviderWrapper';
import { encryptToggle } from "actions/sendMessageActions.js";
import { WEB3_FOUND, WEB3_LOADED, WEB3_UPDATE_PROVIDER, updateAccounts, updateNetwork } from 'actions/web3Actions.js';

var Web3 = require('web3'); 

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
    store.dispatch({type: WEB3_UPDATE_PROVIDER, value: 'METAMASK'});
    store.dispatch(updateAccounts(web3, false));
    store.dispatch(updateNetwork(web3, false));
  }
  startApp()
})

// set up a listener to keep track of the network. Metamask doesn't have
// subscribe events yet 
setInterval( () => { 
  let state = store.getState()
  if (state.web3.web3Found) {
    // check if our accounts have changed
    store.dispatch(updateAccounts(state.web3.web3, true));
    // check if the network has changed
    store.dispatch(updateNetwork(state.web3.web3, true));
  }
}, 10000)

function startApp() {
  render(
    <Provider store={store}>
    <E2EThemeProvider>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router>
    </E2EThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
}
