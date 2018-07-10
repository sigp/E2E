import React from 'react'
import propTypes from 'prop-types'
// @ material
import withStyles from '@material-ui/core/styles/withStyles'
import MessageListStyles from 'assets/jss/components/messageListStyles.jsx'
import Hidden from '@material-ui/core/Hidden'
// Messages
// TODO: add Message compoenent
// import MessageListItem from 'components/Messages/MessageListItem.jsx'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Reply from '@material-ui/icons/Reply'
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import Forward from '@material-ui/icons/Forward'
import Add from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'

// Dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

// import Checkbox from '@material-ui/core/Checkbox';
// import Avatar from '@material-ui/core/Avatar';
import Blockies from 'react-blockies'


  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

class MessageList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dialogOpen: false,
      message: null,
    }
  }

  handleClickOpen = (message) => {
      this.setState({ 
        dialogOpen: true,
        message: message,
      })
  }

  handleClickClose = () => {
      this.setState({
        dialogOpen: false,
      })
  }


  render () {
    const { classes, messages } = this.props

    let getColour = (str) => {
      str = str.substr(2)
      let h = 0;
      for (var i = 0; i < str.length; i++) {
        h = str.charCodeAt(i) + ((h << 5) - h)
      }
      const c = (h & 0x00FFFFFF).toString(16).toUpperCase()

      return "000000".substring(0, 6-c.length) + c
    }


    let renderedList = (
        messages.map((value, key) => {
          let topLine = (
            <span className={classes.topLine}>
            {value.sender}
            <Hidden smDown>
              <Forward />
              {value.recipientAddress}
            </Hidden>
            </span>
          )

          return (
              <ListItem key={key} button divider={true} className={classes.listItem}
                  style={{
                      borderLeft: `4px solid #${getColour(value.recipientAddress)}`
                    }}
                  onClick={() => {this.handleClickOpen(value)}}
                >
                <ListItemAvatar>
                  <Blockies
                    seed={value.senderAddress}
                    size={8}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={topLine}
                  secondary={value.message}
                />
                <ListItemSecondaryAction>
                    { value.sender === value.senderAddress &&
                    <Hidden smDown>
                      <Tooltip id='tooltip-add' title='Add Contact'>
                      <IconButton
                      aria-label="Add Contact"
                      >
                          <Add />
                      </IconButton>
                      </Tooltip>
                    </Hidden>
                    }
                    <Tooltip id='tooltip-reply' title='Reply'>
                    <IconButton
                      tooltip="Reply"
                      aria-label="Reply"
                    >
                        <Reply />
                    </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
          )

          // return (
          //   
          //     <MessageListItem
          //         key={key}
          //         sender={value.sender}
          //         message={value.message}
          //         senderAddress={value.senderAddress}
          //         recipientAddress={value.recipientAddress}
          //     />
          // )
        })
    )

    // Getting the dialog things
    let diagTo, diagFrom
    if (this.state.message !== null) {
      diagTo = (
        <Typography variant="headline">
          {this.state.message.recipientAddress}
        </Typography>
      )

      diagFrom = (
        <Typography variant="headline">
          {this.state.message.sender}
        </Typography>
      )
    }
    return (
      <div>
        <List>
          <Divider />
          {renderedList}
        </List>
        { this.state.message !== null &&
        <Dialog
          fullScreen
          open={this.state.dialogOpen}
          onClose={this.handleClickClose}
          TransitionComponent={Transition}
        >
          <AppBar style={{ position: 'relative'}}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClickClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit">
                  From: {this.state.message.sender}
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem>
                <ListItemAvatar>
                  <Blockies
                    seed={this.state.message.senderAddress}
                    size={8}
                  />
                </ListItemAvatar>
                <ListItemText
                    primary={diagFrom}
                    secondary="From"
                />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                  <Blockies
                    seed={this.state.message.recipientAddress}
                    size={8}
                  />
                </ListItemAvatar>
              <ListItemText
                 primary={diagTo}
                 secondary="To"
              />
            </ListItem>
          </List>
          <Divider />
          <div className={classes.dialogMessageBody}>
            <Typography variant="body1">
              {this.state.message.message}
            </Typography>
          </div>
        </Dialog>
        }
      </div>
    )
  }

}

MessageList.propTypes = {
  classes: propTypes.object.isRequired,
  messages: propTypes.array.isRequired,
}


export default withStyles(MessageListStyles)(MessageList)
