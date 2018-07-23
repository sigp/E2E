const notificationStyle = theme => ({
  notificationSlider: {
    transition: 'all 0.3s ease-in-out',
    //position: 'fixed',
    bottom: '-200px',
    //zIndex: 999,
    height: '200px',
    margin: '0px 10px',
    marginBottom: '-210px',
    position: 'relative',
    display: 'inline-block',
    width: '250px',
    background: '#f5f5f5',
    color: '#202124',
    borderTopRightRadius: '3px',
    borderTopLeftRadius: '3px',
    padding: '0px 0px 5px 0px',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    boxSizing: 'border-box',
    "&::after": {
      content: '""',
      background: "url('https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg') no-repeat center",
      backgroundSize: 'contain',
      opacity: '0.05',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: 'absolute',
      zIndex: '0',
    }
  },
  notificationSliderOpen: {
    bottom: '200px',
    transition: 'bottom 0.3s ease-in-out',
    transitionDelay: '0.5s'
  },
  notificationSliderClosed: {
    bottom: '-10px',
    transition: 'all 0.3s ease-in-out',
    animation: 'closeMe 0.3s forwards',
    animationDelay: '0.3s'
  },
  contentContainer: {
    marginTop: '20px',
    height: '100px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  pending: {
    animation: 'rotating 2s ease-in-out infinite',
  },
  awaiting: {
    position: 'absolute',
    animation: 'blockLoading 2s ease-in-out infinite',
  },
  confirmed: {
    animation: 'check 0.8s forwards',
    animationDelay: '0.2s',
    transform: 'rotate(45deg)',
    borderBottom: '3px solid',
    borderRight: '3px solid',
    transformOrigin: 'left top',
    position: 'absolute',
    top: '55px',
    left: '105px',
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
  '@keyframes blockLoading': {
    '0%': {
      height: '0px',
      width: '0px',
      right: '-10px'
    },
    '50%': {
      height: '60px',
      width: '60px',
      right: '50%',
      marginRight: '-30px'
    },
    '100%': {
      height: '0px',
      width: '0px',
      right: '260px'
    }
  },
  '@keyframes check': {
    '0%': {
      top: '55px',
      left: '105px',
      width: '0px',
      height: '0px'
    },
    '20%': {
      top: '55px',
      left: '105px',
      width: '20px',
      height: '0px'
    },
    '40%': {
      top: '12px',
      left: '147px',
      width: '20px',
      height: '60px'
    },

    '100%': {
      top: '12px',
      left: '147px',
      width: '20px',
      height: '60px'
    }
  },

  '@keyframes closeMe': {
    '0%': {
      width: '250px'
    },
    '100%': {
      width: '0',
    }
  },

})

export default notificationStyle
