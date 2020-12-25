# FA1.2 Workshop

![contracts](https://github.com/catsoap/fa1.2-workshop/workflows/contracts/badge.svg)
![dapp](https://github.com/catsoap/fa1.2-workshop/workflows/dapp/badge.svg)

A monorepo for dapp development on Tezos.

## Requirements

- yarn
- docker

## Installation

`yarn`

## Packages

yarn workspaces are used in order to be able to import contract addresses in the dapp.  
There are 2 packages:

- dapp: React app
- contracts: Custom scripts with taquito, test with mocha/chai, contract with ligo

## Dev

Before running dapp, create packages/dapp/.env after the .dist.

- yarn dapp:start / starts the dapp from the dapp package
- yarn sandox:start / starts the flextesa sandbox
- yarn contracts:compile token.ligo / compiles a contract with ligo
- yarn contracts:deploy env / deploy contracts

To compile, deploy and launch tests in a row, run `yarn contracts:compile token.ligo && yarn run contracts:deploy dev 1 && yarn contracts:test`

## Sandbox

You can enter the sandbox with `sandbox:shell`.  
To import the default secret keys, run:

- `tezos-client import secret key alice unencrypted:edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq`
- `tezos-client import secret key bob unencrypted:edsk3RFfvaFaxbHx8BMtEW1rKQcPtDML3LXjNqMNLCzC3wLC1bWbAt`
