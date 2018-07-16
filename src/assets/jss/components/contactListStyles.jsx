const ContactListStyles = theme => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
  },
  spacers: {
      //background: theme.palette.background.paper,
      flex: 1,
      //display: 'table',
      //height: '58px',
      padding: '10px',
      boxSizing: 'border-box',
      //transition: 'all 0.1s linear',
      //background: 'rgba(255,255,255,0.1)',
      margin: '10px',
      //width: '100%',
      //'table-layout': 'fixed',
      // TODO: fix hover
      //'&:hover': {
      //  background: 'rgba(255,255,255,0.2)',
      //  padding: '10px 60px',
      //  //background: theme.palette.primary.main, //'#f5f5f5',
      //  cursor: 'pointer',
      //}
  },
})

export default ContactListStyles
