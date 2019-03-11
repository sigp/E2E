import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';

MuiThemeProvider.propTypes = {}

const mapStateToProps = state => {
  return { theme : state.app.theme } 
}

export default connect(
  mapStateToProps 
)(MuiThemeProvider)
