import React from 'react'
import PropTypes from 'prop-types'
// @ material
import withStyles from '@material-ui/core/styles/withStyles'
import MessageListStyles from 'assets/jss/components/messageListStyles.jsx'
// Messages
// TODO: add Message compoenent
import MessageListItem from 'components/Messages/MessageListItem.jsx'

const MessageList = ({ ...props}) => {

  const { classes, messages } = props

  let renderedList = (
      messages.map((value, key) => {
        return (
            <MessageListItem
                sender={value.sender}
                message={value.message}
                address={value.address}
            />
        )
      })
  )
  return (
    <div>
        {renderedList}
    </div>
  )
}

MessageList.PropTypes = {
  classes: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
}


export default withStyles(MessageListStyles)(MessageList)
