import React, {Component} from 'react'

/**
 * Message box to write message
 */
export default class MessageBox extends Component {

    /**
     * Constructor initializes known accounts
     * @param {Object} props - properties from parent
     */
    constructor(props) {
        super(props)
        this.state = {
            'encrypt': true,
            'sendMessage': {
                'recipient': '',
                'message': '',
            },
        }
    }

    /**
     * Handle the message recipient typing
     * @param {Object} event - The event when typing
     */
    handleMessageRecipient(event) {
        // TODO search for key
        this.setState({
            'sendMessage': {
                'recipient': event.target.value.replace(/^\s+|\s+$/g, ''),
                'message': this.state.sendMessage.message,
            },
        })
    }

    /**
     * Handle the message typing event
     * @param {Object} event - Message box being typed
     */
    handleMessageMessage(event) {
        this.setState({
            'sendMessage': {
                'recipient': this.state.sendMessage.recipient,
                'message': event.target.value,
            },
        })
    }

    /**
     * Handle the message being sent
     * @param {*} data - data to send
     * @param {*} event - event of the target pressed
     */
    handleMessageSend(data, event) {
        if (this.state.sendMessage.message.replace(/\s/g, '') === '') {
            return
        }
        console.log(`[MessageBox] 
            ${this.state.sendMessage.recipient} : 
            ${this.state.sendMessage.message} : 
            ${this.state.encrypt} `
        )
        this.props.onSubmitMessage(
            this.state.sendMessage.recipient,
            this.state.sendMessage.message,
            this.state.encrypt
        )
    }

    /**
     * Handle keypress on the message box to see if we should
     * fire off the send event.
     * @param {Event} target Target for the event
     */
    handleMessageKeyPress(target) {
        if (target.charCode == 13 && !target.shiftKey) {
            target.preventDefault()
            if (
                this.state.sendMessage.recipient === '' ||
                this.state.sendMessage.message === ''
            ) {
                return
            }
            this.handleMessageSend()
        }
    }

    /**
     * Clear the message box and the recipient box.
     */
    clearBox() {
        this.setState({
            'sendMessage': {
                'recipient': '',
                'message': '',
            },
        })
    }

    /**
     * Toggle the encrypted state
     */
    toggleEncrypt() {
        this.setState({
            'encrypt': !this.state.encrypt,
        })
    }

    /**
     * Return the rendered html
     * @return {html} rendered html
     */
    render() {
        return (
            <div className="messageBox">
                <div className="left">
                    <input type="text" className="recipient"
                        placeholder="Recipient"
                        value={this.state.sendMessage.recipient}
                        onKeyPress={this.handleMessageKeyPress.bind(this)}
                        onChange={this.handleMessageRecipient.bind(this)} />
                    <textarea type="text" className="sendmessage"
                        placeholder="Message"
                        onChange={this.handleMessageMessage.bind(this)}
                        onKeyPress={this.handleMessageKeyPress.bind(this)}
                        value={this.state.sendMessage.message}></textarea>
                </div>
                <div className="right">
                    <div
                        className={'encrypt encrypt-'+this.state.encrypt}
                        onClick={this.toggleEncrypt.bind(this)}>
                        <p>Encrypt</p>
                        <div className="check"></div>
                    </div>
                    <div
                        className="sendButton"
                        onClick={this.handleMessageSend.bind(this)}>
                        Send
                    </div>
                </div>
            </div>
        )
    }
}
