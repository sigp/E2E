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
import ContentCopy from '@material-ui/icons/ContentCopy'
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import Add from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import { CopyToClipboard} from 'react-copy-to-clipboard'
// import Checkbox from '@material-ui/core/Checkbox';
// import Avatar from '@material-ui/core/Avatar';
import Blockies from 'react-blockies'

const MessageList = ({ ...props}) => {

  const { classes, messages, replyAction } = props

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
        // let topLine = (
        //   <span className={classes.topLine}>
        //   {value.sender}
        //   <Hidden smDown>
        //     <Forward />
        //     {value.recipientAddress}
        //   </Hidden>
        //   </span>
        // )

        return (
            <ListItem key={key} button divider={true} className={classes.listItem}
                style={{
                    borderLeft: `4px solid #${getColour(value.recipientAddress)}`
                  }}
              >
              <ListItemAvatar>
                <Blockies
                  seed={value.senderAddress}
                  size={8}
                />
              </ListItemAvatar>
              <ListItemText
                primary={value.sender}
                secondary={value.message}
              />
              <ListItemSecondaryAction>
                  <Hidden smDown>
                    <CopyToClipboard text={value.senderAddress}>
                        <IconButton aria-label="Copy">
                            <ContentCopy />
                        </IconButton>
                    </CopyToClipboard>
                  </Hidden>

                  {
                  // @NOTE: TOOLTIP removed until paging implemented
                    value.sender === value.senderAddress &&
                    <Hidden smDown>
                    <IconButton
                    aria-label="Add Contact"
                    onClick={() => {props.addAction(value.senderAddress)}}
                    >
                        <Add />
                    </IconButton>
                    </Hidden>
                  }
                  {
                  // <Tooltip id='tooltip-reply' title='Reply'>
                  <IconButton
                    tooltip="Reply"
                    aria-label="Reply"
                    onClick={() => {replyAction(value.senderAddress)}}
                  >
                      <Reply />
                  </IconButton>
                  // </Tooltip>
                  }
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
