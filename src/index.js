import React from "react";
import { render} from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
//import "assets/css/material-dashboard-react.css?v=1.3.0";
import indexRoutes from "./routes/index.jsx";
import configureStore from './store/configureStore'
import { encryptToggle } from "./actions/sendMessageActions.js"

const store = configureStore();
const hist = createBrowserHistory();

const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)



render(
  <Provider store={store}>
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);
