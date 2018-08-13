const dialogStyle = theme => ({
  darkbg: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'rgba(0,0,0,0.2)',
    zIndex: '9',
  },
  dialog: {
    background: theme.palette.background.paper,
    borderRadius: '3px',
    padding: '0px 0px 10px 0px',
    width: '60%',
    maxWidth: '700px',
    minWidth: '250px',
    maxHeight: '500px',
    position: 'absolute',
    zIndex: '10 !important',
    top: '50%',
    right: '0',
    left: '0',
    margin: 'auto',
    transform: 'translateY(-50%)',
  },
  closebutton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    padding: '0',
    color: '#ccc',
    cursor: 'pointer',

    '&:hover': {
      color: '#999',
      cursor: 'pointer',
    },
  },
  dialogHeader: {
    boxSizing: 'border-box',
    borderBottom: '1px solid #eee',
    padding: '10px',
    fontSize: '18px',
    fontWeight: '100',
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,

    '& h4': {
      float: 'left',
      width: '80%',
    }
  },
  dialogBody: {
    padding: '10px 50px 10px 30px',
  },
  clear: {
    clear: 'both',
  },
  contactDialogHeaderStyle:{
        'display': 'flex',
        'alignItems': 'center',
        padding: '10px',
    },
  contactDialogHeaderIconStyle: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      overflow: 'hidden',
      boxShadow: '0 0 1px 6px #e8e8e8',
      margin: '0px 20px',
      '& .identicon': {
        width: '48px !important',
        height: '48px !important',
      }
    }
})

export default dialogStyle
