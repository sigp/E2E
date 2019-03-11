const contactsPageStyles = theme => ({
  button: {
    position: 'fixed',
    bottom: '70px',
    right: '50px',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
  },
  emptyBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '40vh',
    position: 'relative',
    width: '100%',
    fontSize: '30px',
    textAlign: 'center',
    zIndex: 1,
    "&::after": {
      content: '""',
      background: "url('https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg') no-repeat center",
      opacity: '0.17',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: 'absolute',
      zIndex: '-1',
    },
  },
  placeholderInner: {
    margin: 'auto',
  },
})

export default contactsPageStyles;
