import React from 'react'
import {Meteor} from 'meteor/meteor'
import {render} from 'react-dom'

import App from '../imports/ui/App.jsx'
import Web3Status from '../imports/ui/Web3Status.jsx'

Meteor.startup(() => {
    render(<Web3Status />, document.getElementById('whoami'))
    render(<App />, document.getElementById('main-target'))
})
