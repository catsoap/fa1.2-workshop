/* eslint-env mocha */
const TokenFA12 = artifacts.require('TokenFA12');
const assert = require('assert');
const { InMemorySigner } = require('@taquito/signer');
const accounts = require('../scripts/sandbox/accounts');

contract('TokenFA12', async () => {
  it('should check initial storage', async () => {
    const instance = await TokenFA12.deployed();
    const storage = await instance.storage();
    const aliceAddress = accounts.alice.pkh;
    const { totalSupply } = storage;
    const aliceRecord = await storage.ledger.get(aliceAddress);
    assert.strictEqual(totalSupply.toNumber(), 1000000000);
    assert.strictEqual(aliceRecord.balance.toNumber(), 1000000000);
  });

  it('should transfer tokens from Alice to Bob', async () => {
    const instance = await TokenFA12.deployed();
    const aliceAddress = accounts.alice.pkh;
    const bobAddress = accounts.bob.pkh;
    const value = 100000000;
    await instance.transfer(aliceAddress, bobAddress, value);
    const storage = await instance.storage();
    const aliceRecord = await storage.ledger.get(aliceAddress);
    const bobRecord = await storage.ledger.get(bobAddress);
    assert.strictEqual(aliceRecord.balance.toNumber(), 900000000);
    assert.strictEqual(bobRecord.balance.toNumber(), 100000000);
  });

  it("should fail if transfer isn't approved", async () => {
    const instance = await TokenFA12.deployed();
    const aliceAddress = accounts.alice.pkh;
    tezos.setSignerProvider(
      await InMemorySigner.fromSecretKey(accounts.bob.sk),
    );
    const bobAddress = accounts.bob.pkh;
    const value = 1;
    await assert.rejects(
      instance.transfer(aliceAddress, bobAddress, value),
      (err) => {
        assert.strictEqual(err.message, 'NotPermitted', 'Wrong error message');
        return true;
      },
      'No error is emitted',
    );
  });

  it('should mint 1 token with 1 nanotez', async () => {
    const instance = await TokenFA12.deployed();
    const bobAddress = accounts.bob.pkh;
    tezos.setSignerProvider(
      await InMemorySigner.fromSecretKey(accounts.bob.sk),
    );
    await instance.mint(null, { amount: '0.000001' });
    const storage = await instance.storage();
    const bobRecord = await storage.ledger.get(bobAddress);
    assert.strictEqual(bobRecord.balance.toNumber(), 100000001);
  });

  it('should redeem 1 token', async () => {
    const instance = await TokenFA12.deployed();
    const bobAddress = accounts.bob.pkh;
    tezos.setSignerProvider(
      await InMemorySigner.fromSecretKey(accounts.bob.sk),
    );
    await instance.redeem(1);
    const storage = await instance.storage();
    const bobRecord = await storage.ledger.get(bobAddress);
    assert.strictEqual(bobRecord.balance.toNumber(), 100000000);
  });
});
