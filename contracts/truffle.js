// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  
  build: "./node_modules/.bin/webpack",

  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 4600000
    }
  }
}
