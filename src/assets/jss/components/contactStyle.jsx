const contactStyle = theme => ({
  contactContainer: {
      background: theme.palette.background.paper,
      display: 'table',
      height: '58px',
      padding: '10px',
      boxSizing: 'border-box',
      width: '100%',
      'table-layout': 'fixed',
      '&:hover': {
        background: theme.palette.primary.main, //'#f5f5f5',
        cursor: 'pointer',
      }
  },
  contactId: {
    boxSizing: 'border-box',
    overflow: 'hidden',
    display: 'table-cell',
    verticalAlign: 'middle',
    height: '58px',
    width: '80px',
    paddingRight: '20px',
    paddingLeft: '10px',
  },
  circleHolder: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    overflow: 'hidden',
    padding: 0,
    margin: 0,
  },
  contactName: {
    height: '58px',
    width: '40%',
    minWidth: '180px',
    display: 'table-cell',
    padding: '5px',
    boxSizing: 'border-box',
    lineHeight: '22px',
    verticalAlign: 'middle',
    paddingRight: '20px',
  },
  contactAddr: {
    width: '45%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    display: 'table-cell'
  },
  '@media (max-width: 703px)': {
    contactName: {
      width: '100%',
      minWidth: 'auto',
    },
    contactAddr: {
      display: 'none',
    },
  },
  '@media (min-width: 1300px)': {
    contactName: {
      width: '450px'
    }
  }
})

export default contactStyle
