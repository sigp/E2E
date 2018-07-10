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
// import Checkbox from '@material-ui/core/Checkbox';
// import Avatar from '@material-ui/core/Avatar';
import Blockies from 'react-blockies'

const MessageList = ({ ...props}) => {

  const { classes, messages } = props

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
            <ListItem key={key} button divider={true} className={classes.listItem}>
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
  return (
    <div>
      <List>
        <Divider />
        {renderedList}
      </List>
    </div>
  )
}

MessageList.propTypes = {
  classes: propTypes.object.isRequired,
  messages: propTypes.array.isRequired,
}


export default withStyles(MessageListStyles)(MessageList)
