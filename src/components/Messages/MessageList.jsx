import React from 'react'
import propTypes from 'prop-types'
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
                key={key}
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

MessageList.propTypes = {
  classes: propTypes.object.isRequired,
  messages: propTypes.array.isRequired,
}


export default withStyles(MessageListStyles)(MessageList)
