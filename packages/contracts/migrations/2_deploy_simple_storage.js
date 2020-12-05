const SimpleStorage = artifacts.require("SimpleStorage");
const saveContractAddress = require('../helpers/saveContractAddress');

module.exports = async(deployer) => {
  await deployer.deploy(SimpleStorage, 3)
        .then(({address}) => saveContractAddress('simple-storage', address));
};
