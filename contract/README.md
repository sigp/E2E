# E2E

Ethereum 2 Ethereum - Encrypted Ethereum Messaging Dapp

## Development

The framework used to originally build this has fatally upgraded and this code needs to be completely re-written. 

I have fixed most of the build logic, but the javascript now needs to be upgraded to work with the newly returned promise logic. 

### Getting Started

For developement, the easiest set up is to use `truffle` with `testrpc`. Install both of these packages with npm like so:

``` bash
$ npm install -g truffle
$ npm install -g ethereumjs-testrpc
```

We need to install misc node modules
``` bash
$ npm install
```

This may also be required in `app/javascripts` but potentially not. 


### Running a test instance

Clone the repository and change directory into the cloned repo. You then need to run an instance of testrpc

``` bash
$ testrpc
```

This will create a number of fake ethereum accounts and provide an RPC port which mimics an ethereum node. See help options of testrpc for customizing this.

Once testrpc is running, we need to compile our smart contract and load it into the virtual block chain, provided by testrpc. This is done with truffle, using

``` bash
$ truffle build
$ truffle deploy
```

You should see the contract compile and be created on the testrpc interface.

We then build our javascript front end to interact with the RPC interface and call the smart contract. This is done with the following command

``` bash
$ npm run dev
```

You can then connect to the test app on port `8080` and do some testing.
