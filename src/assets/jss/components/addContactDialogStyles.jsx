const AddContactStyles = theme => ({
  content: {
    width: '100%',
    boxSizing: 'border-box',
    maxWidth: '600px',
    minWidth: '400px',
  },
  loader: {
    display: 'block',
    margin: '20px auto 10px',
    textAlign: 'center',
  },
  identiContainer: {
    height: '48px',
    width: '48px',
    borderRadius: '50%',
    overflow: 'hidden',
    boxShadow: '0 0 1px 6px #e8e8e8',
    margin: '10px auto',
    backgroundColor: '#888',
  },
  invalidAddress: {
    width: '48px',
    height: '48px',
    display: 'table-cell',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  invalidIcon: {
    height: '48px',
    width: '48px',
    color: '#b95252',
    display: 'block',
    margin: 'auto auto',
    textAlign: 'center',

  },
  errorText: {
    color: '#b95252 !important'
  }
})

export default AddContactStyles
