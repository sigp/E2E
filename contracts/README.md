# E2E

Ethereum 2 Ethereum - Encrypted Ethereum Messaging Dapp

## Development

This project is currently under active development... 

The notes here may be obsolete, but will be updated the project develops.

### Getting Started

For development, the easiest set up is to use `truffle` with `ganache-cli`. Install both of these packages with npm:

``` bash
$ npm install -g truffle
$ npm install -g ganache-cli
```

We need to install misc node modules
``` bash
$ npm install
```

### Running a test instance

Clone the repository and change directory into the cloned repo. You then need to run an instance of `ganache`.  

``` bash
$ ganache-cli
```

This will create a number of fake Ethereum accounts and provide an RPC port which mimics an Ethereum node. See help options of `ganache` for customizing this.

Once `ganache-cli` is running, we need to compile our smart contract and load it into the virtual block chain, provided by `ganache`. This is done with truffle, using

``` bash
$ truffle build
$ truffle deploy
```

You should see the contract compile and be created on the `ganache` interface.

We then build our javascript front end to interact with the RPC interface and call the smart contract. This is done with the following command

``` bash
$ npm run dev
```

You can then connect to the test app on port `8080` and do some testing.
