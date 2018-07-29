const sendMessageStyle = theme => ({
  card: {
    backgroundColor: theme.palette.background.paper,
  },
  inputFieldContainer: {
    width: "100%",
  },
  textField: {
    width: "100%",
    display: "block",

    "& div": {
        width: "100%",
    },
  },
  container: {
      width: "95%",
      display: "block",
      margin: "auto",
      position: "relative",
      backgroundColor: "inherit"
  },
  actionContainers: {
    float: "right",
    color: theme.palette.text.primary,
  },
  button: {
    margin: theme.spacing.unit,
    "&.sm": {
      width: "100%",
      margin: "0 auto"
    }
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  gasCounter: {
    float: "left",
    fontSize: "12px",
    color: theme.palette.text.secondary, // "#aaa",
    margin: "10px 0px",
    "&.sm": {
      float: "none",
    },
  },
  recipientIconContainer: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    overflow: 'hidden',
    fontSize: 'initial',
    marginRight: '15px',

    '& > canvas': {
      height: '35px !important',
      width: '35px !important',
    }
  },
  recipient: {
    display: 'flex',
    alignItems: 'center',
  },
  invalidRecipientIcon: {
    background: '#612929',
    width: '35px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',

    '& > svg': {
      margin: 'auto',
      fontSize: '30px',
    }
  },
})
export default sendMessageStyle
