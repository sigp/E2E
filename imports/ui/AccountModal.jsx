import React, {Component} from 'react'

/**
 * The account modal that looks for the given
 * accounts.
 */
export default class AccountModal extends Component {

    /**
     * Handles the state initialization.
     * @param {Object} props - Properties passed to the modal
     */
    constructor(props) {
        super(props)
        this.state = {
            'currentAccounts': [],
            'selected': this.props.currentAccounts,
            'nextdisabled': true,
            'loading': true,
            'newAccount': false,
            'addAccount': {
                'Address': '',
                'PrivateKey': '',
            },
        }
    }

    /**
     * When the component is mounted
     */
    componentDidMount() {
        const that = this
        // setTimeout(function(){
        try {
            Promise.resolve(web3.eth.getAccounts())
                .then((res) => {
                    // call the api to get the accounts
                    that.setState({
                        'currentAccounts': res,
                        'loading': false,
                    })
                })

        } catch (exception) {
            console.log(exception)
        }
        // }, 3000)
    }


    /**
     * Handles the click event of the account.
     * @param {String} data - Address of account.
     * @param {Object} event - Event of click action.
     */
    handleClick(data, event) {
        let selectedSet = this.state.selected
        if (selectedSet.indexOf(data) === -1) {
            selectedSet.push(data)
            this.setState({'selected': selectedSet})
        } else {
            selectedSet.splice(selectedSet.indexOf(data), 1)
            this.setState({'selected': selectedSet})
        }

        if (selectedSet.length > 0) {
            this.setState({'nextdisabled': false})
        } else {
            this.setState({'nextdisabled': true})
        }
    }

    /**
     * Aciton handler for the `next button` click.
     * @param {Object} event - Click event
     */
    handleNext(event) {
        if (this.state.nextdisabled) {
            return
        }
        console.log(`Next clicked: ${this.state.selected}`)
        this.props.onAccountUpdates(this.state.selected)
    }

    /**
     * Handles the new account address field filled.
     * @param {Object} event - The event of a new account.
     */
    handleAccountAddress(event) {
        // TODO search for key
        this.setState({
            'addAccount': {
                'Address': event.target.value,
                'PrivateKey': '',
            },
        })
    }

    /**
     * Toggles the modal close
     */
    toggleCloseModal() {
        this.props.handleModalClose()
    }

    /**
     *  Toggle the state to new account.
     * @param {Object} event - The click event.
     */
    toggleNewAccount(event) {
        this.setState({'newAccount': !this.state.newAccount})
    }

    /**
     * Render the html based on the state.
     * @return {html} - Rendered html.
     */
    render() {
        let selectedSet = this.state.selected
        let disabledState = true
        let closeButton = ''
        if (selectedSet > 0) {
            disabledState = false
        }

        if (this.state.loading) {
            return (
                <div>
                    <header>Loading Accounts</header>
                    <div className="spinner">
                        <div className="sk-folding-cube">
                            <div className="sk-cube1 sk-cube"></div>
                            <div className="sk-cube2 sk-cube"></div>
                            <div className="sk-cube4 sk-cube"></div>
                            <div className="sk-cube3 sk-cube"></div>
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.newAccount) {
            return (
                <div>
                    <header className="newaccount-header">
                        New Account
                        <div
                            className="go-back"
                            onClick={this.toggleNewAccount.bind(this)}>
                            <div className="backArrow"></div>
                        </div>
                        <div className="close-button"
                            onClick={this.toggleCloseModal.bind(this)}>X</div>
                    </header>
                    <ul className="new-account-form">
                        <li>
                            <div className="group">
                                <input
                                    type="text"
                                    value={this.state.addAccount.Address}
                                    onChange=
                                        {this.handleAccountAddress.bind(this)}/>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Address</label>
                            </div>
                        </li>
                        <li>
                            <div className="group">
                                <input
                                    type="text"
                                    value={this.state.addAccount.PrivateKey}
                                    onChange={this.handleAccountPubKey}/>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>PrivKey (to convert to pub)</label>
                            </div>
                        </li>
                        <li>
                            <button onClick={this.addNewAccountDone}>
                                Add
                            </button>
                        </li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    <header>
                        Select Accounts
                        <div className="close-button"
                            onClick={this.toggleCloseModal.bind(this)}>X</div>
                    </header>
                    <ul className="accounts-list">
                        {
                            this.state.currentAccounts.map((acc) => {
                                let cname = ''
                                if (selectedSet.indexOf(acc) != -1) {
                                    cname = 'toggled'
                                }
                                return (
                                    <li
                                        onClick=
                                            {this.handleClick.bind(this, acc)}
                                        className={cname}
                                        key={acc}>
                                        {acc}
                                    </li>
                                )
                            })
                        }
                        <li className="newAccount"
                            onClick={this.toggleNewAccount.bind(this)}>
                            <div className="oplus"></div>
                        </li>
                    </ul>
                    <button
                        type="submit"
                        onClick={this.handleNext.bind(this)}
                        disabled={this.state.nextdisabled}>
                        Next
                    </button>
                </div>
            )
        }
    }
}
