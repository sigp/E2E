import React from 'react'
import propTypes from 'prop-types'
import Blockies from 'react-blockies'
import classNames from 'classnames'

// @ material
import withStyles from '@material-ui/core/styles/withStyles'

import messageItemStyle from 'assets/jss/components/messageItemStyle.jsx'

class MessageListItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open})
  }

  render() {
    // const MessageListItem = ({ ...props }) => {
    const { classes, sender, message, address } = this.props

    let contentClass = classNames({
        [classes.messageContent]: true,
        [classes.contentClosed]: !this.state.open
    })

    let containerClass = classNames({
        [classes.messageContainer]: true,
        [classes.contentOpen]: this.state.open
    })

    return (
      <div
        className={containerClass}
        onClick={this.handleClick}
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
}

MessageListItem.propTypes = {
  classes: propTypes.object.isRequired,
  sender: propTypes.string.isRequired,
  message: propTypes.string.isRequired,
  address: propTypes.string.isRequired,
//  onClick: propTypes.func.isRequired,
  //TODO future: give etherscan tx url etc.
}

export default withStyles(messageItemStyle)(MessageListItem)
