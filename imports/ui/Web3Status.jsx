import React, {Component} from 'react'

/**
 * Web3 Status bar up the top to monitor web3 status
 */
export default class Web3Status extends Component {

    /**
     * Constructor to initialize state
     */
    constructor() {
        super()
        this.state = {
            'connected': 'web3-noconnect',
        }
    }

    /**
     * Once mounted, web3 will try check connected.
     */
    componentDidMount() {
        web3.eth.getCoinbase()
            .then((res) => {
                if (web3.currentProvider.connected) {
                    this.setState({
                        'connected': 'web3-connect',
                    })
                }
            })
    }

    /**
     * Renders the html for the web3 status.
     * @return {html} rendered html
     */
    render() {
        let status = 'Disconnected'
        if (this.state.connected === 'web3-connect') {
            status = 'Connected'
        }
        return (
            <div className={this.state.connected}>
                <span>Web3: {status}</span>
            </div>
        )
    }
}

