const { MichelsonMap } = require('@taquito/taquito');

const Token = artifacts.require('TokenFA12');
const saveContractAddress = require('../helpers/saveContractAddress');

module.exports = async (deployer, _network, accounts) => {
  const totalSupply = '10000000';
  const totalStaked = '0';
  const rewardPerShare = '0';
  const lastUpdateTime = '0';
  const storage = {
    totalStaked,
    rewardPerShare,
    lastUpdateTime,
    totalSupply,
    ledger: MichelsonMap.fromLiteral({
      [accounts[0]]: {
        balance: totalSupply,
        staked: totalStaked,
        lastRewardPerShare: lastUpdateTime,
        allowances: MichelsonMap.fromLiteral({}),
      },
    }),
  };

  await deployer.deploy(Token, storage)
    .then(({ address }) => saveContractAddress('token', address));
};
