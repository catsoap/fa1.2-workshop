# FA1.2 Workshop

A monorepo for dapp development on Tezos.

## Requirements

- yarn
- docker

## Installation

`yarn install`

## Packages

yarn workspaces are used in order to be able to import contract addresses.  
There are 2 packages:

- dapp, created with `npx create-react-app dapp --template typescript`
- contracts, created with `truffle unbox tezos-example`

## Dev

- yarn run start-sandox / starts the flextesa sandbox from the contracts package
- yarn run compile / compiles contracts
- yarn run migrate / migrates contracts
- yarn run start-dapp / starts the react app in the dapp package
- yarn run test-contracts / launch contracts tests

## Resources

https://dev.to/limal/simplify-your-monorepo-with-npm-7-workspaces-5gmj  
https://github.com/stove-labs/tezos-starter-kit  
https://github.com/stove-labs/tzip-12
