# E2E

Ethereum 2 Ethereum - Encrypted Ethereum Messaging Dapp

## Development

### Getting Started

For developement, the easiest set up is to use `truffle` with `testrpc`. Install both of these packages with npm like so:

``` bash
$ npm install -g truffle
$ npm install -g ethereumjs-testrpc
```

### Running a test instance

Clone the repository and change directory into the cloned repo. You then need to run an instance of testrpc

``` bash
$ testrpc
```

This will create a number of fake ethereum accounts and provide an RPC port which mimics an ethereum node. See help options of testrpc for customizing this.

Once testrpc is running, we need to compile our smart contract and load it into the virtual block chain, provided by testrpc. This is done with truffle, using

``` bash
$ truffle migrate
```

You should see the contract compile and be created on the testrpc interface.

We then build our javascript front end to interact with the RPC interface and call the smart contract. This is done with the following command

``` bash
$ truffle serve
```

You can then connect to the test app on port `8080` and do some testing.
