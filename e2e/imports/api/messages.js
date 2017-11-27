import {Meteor} from 'meteor/meteor'

if (Meteor.isServer) {
    Meteor.publish('messages', function messagePublish() {
        return [
            {
                '_id': 0,
                'to': '0x752E2a59C2eF1C9a36a3095E46ECB28b9EEDfFDc',
                'from': '0xfe905B1F5fC8A3DEFc4734f0086D4E70c4c2d313',
                'message': 'hello',
            },
            {
                '_id': 1,
                'to': '0x936aC4aea651D224F9a257F272d9a6d7e1e042A9',
                'from': '0xfe905B1F5fC8A3DEFc4734f0086D4E70c4c2d313',
                'message': 'this',
            },
        ]
    })
}

Meteor.methods({
    // TODO
})
