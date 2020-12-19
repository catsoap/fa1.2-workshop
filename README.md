# FA1.2 Workshop

![ci](https://github.com/catsoap/fa1.2-workshop/workflows/ci/badge.svg)

A monorepo for dapp development on Tezos.

## Requirements

- yarn
- docker

## Installation

`yarn`

## Packages

yarn workspaces are used in order to be able to import contract addresses in the dapp.  
There are 2 packages:

- dapp, created with `npx create-react-app dapp --template typescript`
- contracts, created with `truffle unbox tezos-example`

## Dev

- yarn run start-dapp / starts the dapp from the dapp package
- yarn run start-sandox / starts the flextesa sandbox from the contracts package
- yarn run compile / compiles contracts
- yarn run migrate / migrates contracts
- yarn run test-contracts / launch contracts tests
