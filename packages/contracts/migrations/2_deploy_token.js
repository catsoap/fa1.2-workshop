const { MichelsonMap } = require('@taquito/taquito');

const Token = artifacts.require('TokenFA12');
const saveContractAddress = require('../helpers/saveContractAddress');

module.exports = async (deployer, _network, accounts) => {
  const totalSupply = '1000000000';
  const storage = {
    totalSupply,
    ledger: MichelsonMap.fromLiteral({
      [accounts[0]]: {
        balance: totalSupply,
        allowances: MichelsonMap.fromLiteral({}),
      },
    }),
  };

  await deployer.deploy(Token, storage)
    .then(({ address }) => saveContractAddress('token', address));
};
