import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import {PropTypes} from 'prop-types'
import {Meteor} from 'meteor/meteor'

import {Messages} from '../api/messages.js'
import Message from './Message.jsx'
import Chat from './Chat.jsx'
import AccountModal from './AccountModal.jsx'
import MessageBox from './MessageBox.jsx'

/**
 * App controls all of the subclasses and main functionality.
 */
class App extends Component {
    /**
     * Constructor sets state
     * @param {Object} props - properties.
     */
    constructor(props) {
        super(props)

        this.state = {
            'accounts': {},
            'accountModal': true,
            'current': '',
            'messageid': 12,
        }
    }

    /**
     * Updates the accounts list.
     * @param {Array} res - list of accounts
     */
    updateAccountList(res) {
        newAccounts = {}
        res.forEach((element) => {
            newAccounts[element] = ''
        })

        this.setState({
            'accounts': newAccounts,
            'accountModal': false,
        })
    }

    /**
     * Pull messages for the Chat
     * @param {String} addr - selected account address
     */
    handleSelectChat(addr) {
        if (this.state.current === addr) {
            return
        }
        let currentAccounts = this.state.accounts

        if (addr in currentAccounts) {
            currentAccounts[addr] = 'selected'
        }
        if (this.state.current in currentAccounts) {
            currentAccounts[this.state.current] = ''
        }

        this.setState({
            'accounts': currentAccounts,
            'current': addr,
        })
    }

    /**
     * Toggles the new account modal
     */
    toggleNewAccount() {
        this.setState({
            'accountModal': !this.state.accountModal,
        })
    }

    /**
     * Renders the new account modal and background.
     * @return {html} - rendered modal html.
     */
    renderAccountModal() {
        if (this.state.accountModal) {
            return (
                <div>
                    <div id="fadedbg"></div>
                    <div className="account-modal">
                        <AccountModal
                            onAccountUpdates={this.updateAccountList.bind(this)}
                            handleModalClose={this.toggleNewAccount.bind(this)}
                            currentAccounts={Object.keys(this.state.accounts)}
                        />
                    </div>
                </div>
            )
        }
    }

    /**
     * Handle the submission of the message.
     * Send to Contract
     * @param {String} to  - address of message
     * @param {String} message - Message to send to
     * @param {Boolean} encrypt - Boolean to encrypt
     */
    handleSubmitMessage(to, message, encrypt) {
        if (this.state.current === '') {
            alert('No account selected')
            return
        }
        this.props.messages.push({
            '_id': this.state.messageid,
            'to': to,
            'from': this.state.current,
            'message': message,
        })

        console.log(`[APP] handleSubmitMessage 
            ${this.state.messageid} =
            ${to},
            ${message},
            ${encrypt}`
        )
        this.setState({'messageid': this.state.messageid + 1})
        this.messageSubmitBox.clearBox()
    }

    /**
     * Renders the box to submit message
     * @return {html} rendered html
     */
    renderSubmitBox() {
        return (
            <MessageBox onSubmitMessage={this.handleSubmitMessage.bind(this)}
                ref={(instance) => {
                    this.messageSubmitBox = instance
                }} />
        )
    }

    /**
     * Render the messages for this user
     * @return {html} list of messages for this user.
     */
    renderMessages() {
        if (this.state.current === '') {
            return
        }

        return this.props.messages.filter((msg) =>
            (msg.to.toLowerCase() === this.state.current.toLowerCase()
                || msg.from.toLowerCase() === this.state.current.toLowerCase()
            )).map((msg) => {
            return (
                <Message
                    key={msg._id}
                    message={msg}
                    sending=''
                    currentUser={this.state.current}
                />
            )
        })
    }

    /**
     * Render the sidebar of chats/accounts
     * @return {html} list of accounts
     */
    renderChats() {
        return Object.keys(this.state.accounts).map((addr, index) => {
            selected = this.state.accounts[addr]
            return (
                <Chat
                    key={addr}
                    chat={addr}
                    selected={selected}
                    onChangeState={this.handleSelectChat.bind(this)}
                />
            )
        })
    }

    /**
     * Render the main HTML
     * @return {html} rendered html
     */
    render() {
        return (
            <div className="main-container">
                {this.renderAccountModal()}
                <div className="dapp-flex-content">
                    <div className="dapp-aside">
                        {this.renderChats()}
                        <div className="newAccountChat"
                            onClick={this.toggleNewAccount.bind(this)}>
                            <div className="oplus"></div>
                        </div>
                    </div>
                    <div id="messages-content">
                        <div className="messages">
                            {this.renderMessages()}
                        </div>
                        {this.renderSubmitBox()}
                    </div>
                </div>
            </div>
        )
    }
}

App.propTypes = {
    'messages': PropTypes.array.isRequired,
}

export default withTracker(() => {
    Meteor.subscribe('messages')
    return {
        'messages': [
            {
                '_id': 0,
                'to': '0x53b13c1e9d5e14669d6fecc3214c02cc41405df6',
                'from': '0xfe905B1F5fC8A3DEFc4734f0086D4E70c4c2d313',
                'message': 'hello',
            },
            {
                '_id': 1,
                'to': '0x53b13c1e9d5e14669d6fecc3214c02cc41405df6',
                'from': '0xfe905B1F5fC8A3DEFc4734f0086D4E70c4c2d313',
                'message': 'this is an incredibly long message that needs to'
                + 'get broken up into a number of different things, yet'
                + 'another thing to consider being a frontend potato',
            },
            {
                '_id': 2,
                'to': '0x53b13c1e9d5e14669d6fecc3214c02cc41405df6',
                'from': '0xfe905B1F5fC8A3DEFc4734f0086D4E70c4c2d313',
                'message': 'lkasjdlkafdaidsaid lkasdj' +
                    'lajddslkajslkdajsldkjsaldkjalksjdlkajdslakjdslasdjlasdjl',
            },
            {
                '_id': 3,
                'to': '0x936aC4aea651D224F9a257F272d9a6d7e1e042A9',
                'from': '0xfe905B1F5fC8A3DEFc4734f0086D4E70c4c2d313',
                'message': 'I ',
            },
            {
                '_id': 4,
                'to': '0x936aC4aea651D224F9a257F272d9a6d7e1e042A9',
                'from': '0xfe905B1F5fC8A3DEFc4734f0086D4E70c4c2d313',
                'message': 'wonder',
            },
            {
                '_id': 5,
                'from': '0x936aC4aea651D224F9a257F272d9a6d7e1e042A9',
                'to': '0xfe905B1F5fC8A3DEFc4734f0086D4E70c4c2d313',
                'message': 'wonder',
            },
            {
                '_id': 6,
                'from': '0x936aC4aea651D224F9a257F272d9a6d7e1e042A9',
                'to': '0xfe905B1F5fC8A3DEFc4734f0086D4E70c4c2d313',
                'message': 'Lorem ipsum dolor sit amet, consectetur'
                + 'adipiscing elit. Ut pellentesque neque mauris, id iaculis'
                + 'nulla molestie gravida. Duis a leo nulla. Mauris eleifend'
                + 'nisl a lacus tempus scelerisque. Donec et pellentesque est.'
                + 'Pellentesque dolor tortor, varius in porta id, pharetra'
                + 'tincidunt urna. Morbi ut arcu non mi malesuada tincidunt.'
                + 'Proin eu lorem a erat laoreet consecte. Nullam rhoncus est'
                + 'eget nisl mattis, at aliquam nibh consequat. Sed euismod'
                + 'sollicitudin nibh ac ullamcorper. Vamus pretium eu orci nec'
                + 'commodo. Quisque in sollicitudin augue, a ullamcorper eros.',
            },
            {
                '_id': 7,
                'from': '0x936aC4aea651D224F9a257F272d9a6d7e1e042A9',
                'to': '0xfe905B1F5fC8A3DEFc4734f0086D4E70c4c2d313',
                'message': 'Lorem ipsum dolor sit amet, consectetur'
                + 'adipiscing elit. Ut pellentesque neque mauris, id iaculis'
                + 'nulla molestie gravida. Duis a leo nulla. Mauris eleifend'
                + 'nisl a lacus tempus scelerisque. Donec et pellentesque est.'
                + 'Pellentesque dolor tortor, varius in porta id, pharetra'
                + 'tincidunt urna. Morbi ut arcu non mi malesuada tincidunt.'
                + 'Proin eu lorem a erat laoreet coectetur. Nullam rhoncus est'
                + 'eget nisl mattis, at aliquam nibh consequat. Sed euismod'
                + 'sollicitudin nibh ac ullamcorr. Vivamus pretium eu orci nec'
                + 'commodo. Quisque in sollicitudin augue, a ullamcorper eros.',
            },
            {
                '_id': 8,
                'from': '0x936aC4aea651D224F9a257F272d9a6d7e1e042A9',
                'to': '0xfe905B1F5fC8A3DEFc4734f0086D4E70c4c2d313',
                'message': 'Lorem ipsum dolor sit amet, consectetur'
                + 'adipiscing elit. Ut pellentesque neque mauris, id iaculis'
                + 'nulla molestie gravida. Duis a leo nulla. Mauris eleifend'
                + 'nisl a lacus tempus scelerisque. Donec et pellentesque est.'
                + 'Pellentesque dolor tortor, varius in porta id, pharetra'
                + 'tincidunt urna. Morbi ut arcu non mi malesuada tincidunt.'
                + 'Proin eu lorem a erat lreet consectetur. Nullam rhoncus est'
                + 'eget nisl mattis, at aliquam nibh consequat. Sed euismod'
                + 'sollicitudin nibh ac ullamrper. Vivamus pretium eu orci nec'
                + 'commodo. Quisque in sollicitudin augue, a ullamcorper eros.',
            },
            {
                '_id': 9,
                'from': '0x936aC4aea651D224F9a257F272d9a6d7e1e042A9',
                'to': '0xfe905B1F5fC8A3DEFc4734f0086D4E70c4c2d313',
                'message': 'Lorem ipsum dolor sit amet, consectetur'
                + 'adipiscing elit. Ut pellentesque neque mauris, id iaculis'
                + 'nulla molestie gravida. Duis a leo nulla. Mauris eleifend'
                + 'nisl a lacus tempus scelerisque. Donec et pellentesque est.'
                + 'Pellentesque dolor tortor, varius in porta id, pharetra'
                + 'tincidunt urna. Morbi ut arcu non mi malesuada tincidunt.'
                + 'Proin eu lorem a erat consectetur. Nullam rhoncus est'
                + 'eget nisl mattis, at aliquam nibh consequat. Sed euismod'
                + 'sollicitudin nibh ac u. Vivamus pretium eu orci nec'
                + 'commodo. Quisque in sollicitudin augue, a ullamcorper eros.',
            },
            {
                '_id': 10,
                'from': '0x936aC4aea651D224F9a257F272d9a6d7e1e042A9',
                'to': '0xfe905B1F5fC8A3DEFc4734f0086D4E70c4c2d313',
                'message': 'Lorem ipsum dolor sit amet, consectetur'
                + 'adipiscing elit. Ut pellentesque neque mauris, id iaculis'
                + 'nulla molestie gravida. Duis a leo nulla. Mauris eleifend'
                + 'nisl a lacus tempus scelerisque. Donec et pellentesque est.'
                + 'Pellentesque dolor tortor, varius in porta id, pharetra'
                + 'tincidunt urna. Morbi ut arcu non mi malesuada tincidunt.'
                + 'Proin eu lorem a erat consectetur. Nullam rhoncus est'
                + 'eget nisl mattis, at aliquam nibh consequat. Sed euismod'
                + 'sollicitudin nibh ac u. Vivamus pretium eu orci nec'
                + 'commodo. Quisque in sollicitudin augue, a ullamcorper eros.',
            },
            {
                '_id': 11,
                'from': '0x936aC4aea651D224F9a257F272d9a6d7e1e042A9',
                'to': '0xfe905B1F5fC8A3DEFc4734f0086D4E70c4c2d313',
                'message': 'Lorem ipsum dolor sit amet, consectetur'
                + 'adipiscing elit. Ut pellentesque neque mauris, id iaculis'
                + 'nulla molestie gravida. Duis a leo nulla. Mauris eleifend'
                + 'nisl a lacus tempus scelerisque. Donec et pellentesque est.'
                + 'Pellentesque dolor tortor, varius in porta id, pharetra'
                + 'tincidunt urna. Morbi arcu non mi malesuada tincidunt.'
                + 'Proin eu lorem a erat consectetur. Nullam rhoncus est'
                + 'eget nisl mattis, at anibh consequat. Sed euismod',
            },
            {
                '_id': 12,
                'from': '0x936aC4aea651D224F9a257F272d9a6d7e1e042A9',
                'to': '0xfe905B1F5fC8A3DEFc4734f0086D4E70c4c2d313',
                'message': 'Lorem ipsum dolor sit amet, consectetur'
                + 'adipiscing elit. Ut pellentesque neque mauris, id iaculis'
                + 'nulla molestie gravida. Duis a leo nulla. Mauris eleifend'
                + 'nisl a lacus tempus scelerisque. Donec et pellentesque est.'
                + 'Pellentesque dolor tortor, varius in porta id, pharetra'
                + 'tincidunt urna. Morbi ut arcu non mi malesuada tincidunt.'
                + 'Proin eu lorem a erat laoreet consectetur. rhoncus est'
                + 'eget nisl mattis, at aliquam nibh consequat. Sed euismod'
                + 'sollicitudin nibh ac ullamcorper. Vivamus pretium orci nec'
                + 'commodo. Quisque in sollicitudin augue, a ullamcorper eros.'
                + 'Etiam aliquet eget nunc sit amet malesuada. Nulla eget'
                + 'pharetra lacus. Proin eget viverra ex. Nam gravida dui a'
                + 'commodo commodo. Mauris egestas purus id risus lobortis'
                + 'eleifend. Vivamus cursus, dolor sit amet condimentum aliq'
                + 'diam est pharetra elit, non ornare lectus est in ante.'
                + 'Integer aliquet ante non leo imperdiet, eu congue nunc'
                + 'sagittis. Aliquam mauris turpis, tempor nec sagittis at,'
                + 'feugiat non nunc. Vestibulum efficitur lorem id vulputate'
                + 'dapibus. Aenean mi leo, mollis ac neque quis, lobortis porta'
                + 'justo. Curabitur vitae risus arcu. Nunc sed sapien libero.'
                + 'Sed libero ex, efficitur sed molestie sit amet, sagittis et'
                + 'lectus. Lorem ipsum dolor sit amet, consectetur adipiscing'
                + 'elit. Aliquam nisl tellus, imperdiet in justo eget, auctor'
                + 'ullamcorper diam. Vivamus a tempor enim. Nam tristique lacus'
                + 'magna, vel dictum nunc sollicitudin ut. Morbi lorem'
                + 'a tortor volutpat lacinia. Quisque non pulvinar leo. Sed'
                + 'pellentesque, felis eu ullamcorper gravida, mi odio eleifend'
                + 'ipsum, in iaculis dolor nisi in felis. Vivamus bibendum odio'
                + 'ut sem vehicula, sed sollicitudin risus iaculis. Etiam'
                + 'sollicitudin vitae ipsum luctus mattis. In at facilisis'
                + 'massa.',
            },
        ],
    }
})(App)
