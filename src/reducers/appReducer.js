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
    
    background: { 
      default:  '#0d0d0d',
      paper: '#333'
    },
    
    primary: blue, //{ main: '#0d5a7f'},
    secondary: indigo,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    shadows: 'rgba(255,255,255,0.12)',
    type: "dark",
  },}), 
  // material-ui background { default: "#303030", paper: '#424242' }
  ROPSTEN: createMuiTheme({
  palette: {
    background: { 
      default:  '#0c0c0c',
      paper: '#333'
    },
    primary: {main: '#d32f2f'}, //'#fff' },
    secondary: indigo,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    shadows: 'rgba(0,0,0,0.12)',
    type: "dark"
  },}), 
  KOVAN: createMuiTheme({
  palette: {
    background: { 
      default:  '#0c0c0c',
      paper: '#333'
    },
    primary: {main: '#5f144b'} ,
    secondary: indigo,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    shadows: 'rgba(0,0,0,0.12)',
    type: "dark"
  },}), 
  RINKEBY: createMuiTheme({
  palette: {
    background: { 
      default:  '#0c0c0c',
      paper: '#333'
    },
    primary: {main: '#267b6f'}, //'#fff' },
    secondary: indigo,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    shadows: 'rgba(0,0,0,0.12)',
    type: "dark"
  },}), 
  UNKNOWN: createMuiTheme({
  palette: {
    background: { 
      default:  '#0c0c0c',
      paper: '#333'
    },
    primary: {main: '#267b6f'}, //'#fff' },
    secondary: indigo,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    shadows: 'rgba(255,255,255,0.12)',
    type: "dark"
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
