import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

/**
 * Chat component
 * Renders the chats on the edge sidebar
 */
export default class Chat extends Component {

    /**
     * Handle the selection of a chat.
     * @param {String} data - Change state of Data
     * @param {event} event - Event to handle.
     */
    handleChatSelect(data, event) {
        this.props.onChangeState(data)
    }


    /**
     * Render the html of the chat
     * @return {html} - Rendered html account.
     */
    render() {
        return (
            <div
                className={'chat ' + this.props.selected}
                onClick={this.handleChatSelect.bind(this, this.props.chat)}>
                <span>{this.props.chat}</span>
            </div>
        )
    }
}

Chat.propTypes = {
    'chat': PropTypes.string.isRequired,
    'selected': PropTypes.string,
}
