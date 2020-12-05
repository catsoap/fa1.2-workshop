const Counter = artifacts.require("Counter");
const saveContractAddress = require('../helpers/saveContractAddress');

module.exports = async(deployer) => {
  deployer.deploy(Counter, 0)
    .then(({address}) => saveContractAddress('counter', address));
};
