# FA1.2 Workshop

A monorepo for dapp development on Tezos.

## Requirements

- npm 7
- bsb-platform
- docker

## Installation

`npm i`

## Packages

npm workspaces are used in order to be able to import contract addresses in the dapp.  
There are 2 packages:

- dapp, created with `bsb -init dapp -theme basic-reason`
- contracts, created with `truffle unbox tezos-example`

## Dev

- npm run start-sandox / starts the flextesa sandbox from the contracts package
- npm run compile / compiles contracts
- npm run migrate / migrates contracts
- npm run start-dapp / starts the dapp in the dapp package
- npm run test-contracts / launch contracts tests
