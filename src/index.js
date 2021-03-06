import React from "react";
import { render} from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import ENS from 'ethereum-ens'
//import "assets/css/material-dashboard-react.css?v=1.3.0";
import indexRoutes from "./routes/index.jsx";
import configureStore from 'store/configureStore';
import E2EThemeProvider from 'containers/Themes/ThemeProviderWrapper';
import { WEB3_FOUND, WEB3_LOADED, WEB3_UPDATE_PROVIDER, updateAccounts, updateNetwork } from 'actions/web3Actions.js';
import { restoreContacts } from 'actions/contactActions.js'
import { retrieveMessages } from 'actions/messageActions.js';

var Web3 = require('web3');

const store = configureStore();
const hist = createBrowserHistory();

/* Initialise state when web3 is found */
function loadWeb3(provider) {
    let web3 = new Web3(provider)
    let ens = new ENS(provider)
    store.dispatch({type: WEB3_LOADED, value: {web3: web3, ens: ens}});
    store.dispatch({type: WEB3_UPDATE_PROVIDER, value: 'INJECTED'});
    store.dispatch(updateAccounts(web3, false));
    store.dispatch(updateNetwork(web3, false));
}

window.addEventListener('load', function() {

  /* Find Contacts */
  store.dispatch(restoreContacts())

  /* Check for injected web3 */
  if (typeof window.web3 !== 'undefined') { // old browsers parity etc..
    loadWeb3(window.web3.currentProvider)
  }
  else {  // new metamask functionality
    window.addEventListener('message', ({ data }) => {
      if (data && data.type && data.type === 'ETHEREUM_PROVIDER_SUCCESS'){
        loadWeb3(window.web3.currentProvider)
      }
    });
    window.postMessage({ type: 'ETHEREUM_PROVIDER_REQUEST'}, '*');
  }
  startApp()
})

// subscribe to the store to update messages when necessary
var unsubscribe = undefined;
export function updateMessages() {
  let curState = store.getState();
  let web3Data = curState.web3;
  if (web3Data.accounts.status === 'SUCCESS') {
    if (curState.messages.status === 'UNINITIALISED' && web3Data.contracts[web3Data.network] !== undefined && web3Data.accounts.active !== '' && web3Data.contractInstance._address !== undefined) {
      unsubscribe();
      store.dispatch(retrieveMessages());
    }
  }
}
unsubscribe = store.subscribe(updateMessages);

// set up a listener to keep track of the network. Metamask doesn't have
// subscribe events yet
setInterval( () => {
  let state = store.getState()
  if (state.web3.web3 !== undefined) {
    // check if our accounts have changed
    store.dispatch(updateAccounts(state.web3.web3, true));
    // check if the network has changed
    store.dispatch(updateNetwork(state.web3.web3, true));
  }
}, 100000)

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
