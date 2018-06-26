import React from 'react'
import PropTypes from 'prop-types'
import Blockies from 'react-blockies'
import classNames from 'classnames'

// @ material
import withStyles from '@material-ui/core/styles/withStyles'

import messageItemStyle from 'assets/jss/components/messageItemStyle.jsx'

const MessageListItem = ({ ...props }) => {
  const { classes, sender, message, address, open, onClick } = props

  let contentClass

  if (open) {
      contentClass = classNames({
        [classes.messageContent]: true,
      })
  } else {
    contentClass = classNames({
      [classes.messageContent]: true,
      [classes.contentClosed]: true
    })
  }

  return (
    <div
      className={classes.messageContainer}
      onClick={onClick}
      >
      <section className={classes.icon}>
        <section className={classes.iconWrapper}>
          <Blockies
            seed={address}
            size={8}
          />
        </section>
      </section>
      <section className={classes.messageRight}>
        <section className={classes.messageSender}>
            {sender}
        </section>
        <section className={contentClass}>
            {message}
        </section>
      </section>
    </div>
  )
}

MessageListItem.PropTypes = {
  classes: PropTypes.object.isRequired,
  sender: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  //TODO future: give etherscan tx url etc.
}

export default withStyles(messageItemStyle)(MessageListItem)
