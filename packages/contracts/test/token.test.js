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
    assert.strictEqual(totalSupply.toNumber(), 1000);
    assert.strictEqual(aliceRecord.balance.toNumber(), 1000);
  });

  it('should transfer tokens from Alice to Bob', async () => {
    const instance = await TokenFA12.deployed();
    const aliceAddress = accounts.alice.pkh;
    const bobAddress = accounts.bob.pkh;
    const value = 100;
    await instance.transfer(aliceAddress, bobAddress, value);
    const storage = await instance.storage();
    const aliceRecord = await storage.ledger.get(aliceAddress);
    const bobRecord = await storage.ledger.get(bobAddress);
    assert.strictEqual(aliceRecord.balance.toNumber(), 900);
    assert.strictEqual(bobRecord.balance.toNumber(), 100);
  });

  it("should fail if transfer isn't approved", async () => {
    const instance = await TokenFA12.deployed();
    const aliceAddress = accounts.alice.pkh;
    tezos.setSignerProvider(
      await InMemorySigner.fromSecretKey(accounts.bob.sk),
    );
    const bobAddress = accounts.bob.pkh;
    const value = 10000;
    await assert.rejects(
      instance.transfer(aliceAddress, bobAddress, value),
      (err) => {
        assert.strictEqual(err.message, 'NotPermitted', 'Wrong error message');
        return true;
      },
      'No error is emitted',
    );
  });

  it('should mint 1 token withe default entry point', async () => {
    const instance = await TokenFA12.deployed();
    const bobAddress = accounts.bob.pkh;
    tezos.setSignerProvider(
      await InMemorySigner.fromSecretKey(accounts.bob.sk),
    );
    await tezos.contract.transfer({ to: instance.address, amount: 1 });
    const storage = await instance.storage();
    const bobRecord = await storage.ledger.get(bobAddress);
    assert.strictEqual(bobRecord.balance.toNumber(), 101);
  });
});
