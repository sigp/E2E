// App reducers
import { UPDATE_THEME} from 'actions/appActions';
import lightBlue from '@material-ui/core/colors/lightBlue';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';

import { createMuiTheme } from '@material-ui/core/styles';

// list of themes for different networks
const themes = { 
  MAINNET: createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },}), 
  ROPSTEN: createMuiTheme({
  palette: {
    primary: red,
    secondary: indigo,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },}), 
  KOVEN: createMuiTheme({
  palette: {
    primary: green,
    secondary: indigo,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },}), 
  RINKEBY: createMuiTheme({
  palette: {
    primary: indigo,
    secondary: indigo,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },}), 
  UNKNOWN: createMuiTheme({
  palette: {
    primary: yellow,
    secondary: indigo,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },}) 
}

const initialState = {
  theme : themes.UNKNOWN
}

const appReducer = (state = initialState, action) => {
  switch (action.type) { 
    case UPDATE_THEME: 
      return updateThemeReducer(state, action)
    default: 
      return state; 
   }
};

const updateThemeReducer = (state, action) => { 
      let newTheme = 'UNKNOWN'
      switch (action.value) {
        case 1:
          newTheme = 'MAINNET'
          break
        case 2:
          newTheme = 'MORDEN'
          break
        case 3:
          newTheme = 'ROPSTEN'
          break
        case 4:
          newTheme = 'RINKEBY'
          break
        case 42:
          newTheme = 'KOVAN'
          break
        default:
          newTheme = 'UNKNOWN'
      }
      return Object.assign({}, state, {theme: themes[newTheme]})
} 

export default appReducer;
