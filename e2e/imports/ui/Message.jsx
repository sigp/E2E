import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

/**
 * Message class to render and handle message actions
 */
export default class Message extends Component {
    /**
     * Constructor sets sending state
     * @param {Object} props - Properties
     */
    constructor(props) {
        super(props)
        this.state = {
            'sending': this.props.sending,
        }
    }

    /**
     * Returns the rendered message changing the orientation if from or to
     * the current address.
     * @return {html} rendered html
     */
    render() {
        let cName = 'message'
        if (this.props.message.from === this.props.currentUser) {
            cName += ' message-from'
        }
        return (
            <div className={cName}>
                <div className="message-info">
                    <div className={this.state.sending}></div>
                    <header><span
                        className='from-addr'>{this.props.message.from}</span>
                        -> <span
                        className='to-addr'>{this.props.message.to}</span>
                    </header>
                </div>
                <div className="clear"></div>
                <span className="message-content">
                    {this.props.message.message}
                </span>
                <div className="clear"></div>
            </div>
        )
    }
}

Message.propTypes = {
    'message': PropTypes.object.isRequired,
    'currentUser': PropTypes.string.isRequired,
    'sending': PropTypes.string.isRequired,
}
