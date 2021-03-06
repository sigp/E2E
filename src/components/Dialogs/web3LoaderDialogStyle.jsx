const web3LoaderStyle = theme => ({
  darkbg: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'rgba(0,0,0,0.2)',
    zIndex: '9',
  },
  title: { 
    position: 'center',
  },

  dialog: {
    background: theme.palette.background.paper,// '#333',
    color: theme.palette.text.primary, //'#fff',
    borderRadius: '3px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: theme.palette.primary.main,
    boxShadow: '0 12px 15px 0 rgba(0,0,0,0.24)',
    padding: '0px 0px 10px 0px',
    width: '60%',
    maxWidth: '700px',
    minWidth: '250px',
    maxHeight: '800px',
    position: 'absolute',
    zIndex: '10 !important',
    top: '50%',
    right: '0',
    left: '0',
    margin: 'auto',
    transform: 'translateY(-50%)',
  },
  dialogBody: {
    padding: '10px 50px 10px 30px',
  },
  '@media (max-width: 600px)': {
    dialog: {
      maxWidth: '90%',
      width: '90%',
    },
    dialogBody: {
      padding: '5px 10px 5px 5px'
    }
  },
  clear: {
    clear: 'both',
  }, 
});

export default web3LoaderStyle;
