import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';

const mapStateToProps = state => {
  return { theme : state.app.theme } 
}

export default connect(
  mapStateToProps 
)(MuiThemeProvider)
