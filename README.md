# FA1.2 Workshop

A monorepo for dapp development on Tezos.

## Requirements

- npm 7
- docker

## Installation

`npm i --legacy-peer-deps`

## Packages

npm workspaces are used in order to be able to import contract addresses.  
There are 2 packages:

- dapp, created with `npx create-react-app dapp --template typescript`
- contracts, created with `truffle unbox tezos-example`

## Dev

- npm run start-sandox / starts the flextesa sandbox from the contracts package
- npm run compile / compiles contracts
- npm run migrate / migrates contracts
- npm run start-dapp / starts the react app in the dapp package

## Resources

https://dev.to/limal/simplify-your-monorepo-with-npm-7-workspaces-5gmj  
https://github.com/stove-labs/tezos-starter-kit  
https://github.com/stove-labs/tzip-12
