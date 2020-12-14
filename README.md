# FA1.2 Workshop

A monorepo for dapp development on Tezos.

## Requirements

- yarn
- bsb-platform
- docker

## Installation

`npm i`

## Packages

yarn workspaces are used in order to be able to import contract addresses in the dapp.  
There are 2 packages:

- dapp, created with `bsb -init react-test -theme react-starter`
- contracts, created with `truffle unbox tezos-example`

## Dapp Dev

Go into the dapp directory and enter `yarn start`, then in another terminal, run `yarn run server`.

## Contract Dev

- yarn run start-sandox / starts the flextesa sandbox from the contracts package
- yarn run compile / compiles contracts
- yarn run migrate / migrates contracts
- yarn run test-contracts / launch contracts tests
