import React from "react";
import { render} from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
//import "assets/css/material-dashboard-react.css?v=1.3.0";
import indexRoutes from "./routes/index.jsx";
import configureStore from 'core/store/configureStore';
import { encryptToggle } from "core/actions/sendMessageActions.js";

// material ui colouring and theme
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';

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


// debug purposes
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)


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
