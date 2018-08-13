const messagesStyle = theme =>  ({
  card: {
    backgroundColor: theme.palette.background.paper
  },
  smallBody: {
      marginTop: '5px',
      padding: 0,
      margin: '0 auto',
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
  syncIcon: {
    animation: 'rotating 2s ease-in-out infinite',
  },
  '@keyframes rotating': {
    '0%': {
      transform: 'scaleX(-1) rotate(450deg)',
    },
    '90%': {
      transform: 'scaleX(-1) rotate(90deg)',
    },
    '100%': {
      transform: 'scaleX(-1) rotate(90deg)',
    }
  },
  refreshButton: { 
    position: 'absolute',
    top: '4px',
    right: '10px'
  }
})

export default messagesStyle
