const contactStyle = theme => ({
  contactContainer: {
      flex: 1,
      padding: '10px',
      maxWidth: '450px',
      transition: 'all 0.1s linear',
      background: 'rgba(255,255,255,0.1)',
      margin: '10px',
      '&:hover': {
        background: 'rgba(255,255,255,0.2)',
        padding: '10px 30px',
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
//    width: '40%',
//    minWidth: '180px',
    display: 'table-cell',
    padding: '5px',
    boxSizing: 'border-box',
    lineHeight: '22px',
    verticalAlign: 'middle',
    paddingRight: '20px',
  },
  bottomRow: {
    display: 'table',
    padding: '10px',
    tableLayout: 'fixed',
  },
  ethlogo: {
    display: 'table-cell',
    width: '15px',
    height: '15px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    minWidth: '15px',
    maxWidth: '15px'
  },
  contactAddr: {
    // width: '45%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    display: 'table-cell',
    padding: '10px',
  },
  '@media (max-width: 2089px)': {
      contactContainer: {
        margin: '10px 20px',
      }
  },
  '@media (max-width: 1725px)': {
      contactContainer: {
        margin: '10px 30px',
      }
  },
  '@media (max-width: 1725px)': {
      contactContainer: {
        margin: '10px 50px',
      }
  }
  // '@media (max-width: 703px)': {
  //   contactName: {
  //     width: '100%',
  //     minWidth: 'auto',
  //   },
  //   contactAddr: {
  //     display: 'none',
  //   },
  // },
  // '@media (min-width: 1300px)': {
  //   contactName: {
  //     width: '450px'
  //   }
  // }
})

export default contactStyle
