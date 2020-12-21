import { expect } from 'chai';
import 'mocha';
import * as assert from 'assert';
import { BigMapAbstraction, TezosToolkit } from '@taquito/taquito';
import { TransferParams } from '@taquito/taquito/dist/types/operations/types';
import { InMemorySigner } from '@taquito/signer';
import { BigNumber } from 'bignumber.js';
import token from '../../deployments/token';
import getConfig, { NetworkConfig } from '../../config';
import accounts from '../../scripts/sandbox/accounts';
import sleep from '../../helpers/sleep';

const alice = accounts['alice'];
const bob = accounts['bob'];
const aliceAddress = accounts.alice.pkh;
const bobAddress = accounts.bob.pkh;

const conf: NetworkConfig = getConfig('dev');
const Tezos = new TezosToolkit(conf.node);

type Storage = {
    totalStaked: BigNumber;
    rewardPerShare: BigNumber;
    lastUpdateTime: string;
    totalSupply: BigNumber;
    ledger: BigMapAbstraction;
};

beforeEach(async () => {
    const signer = await InMemorySigner.fromSecretKey(alice.sk);
    Tezos.setProvider({ signer });
});

describe('Token', async () => {
    it('should check initial storage', async () => {
        const instance = await Tezos.contract.at(token);
        const storage: Storage = await instance.storage();
        const { totalSupply } = storage;
        const aliceRecord: any = await storage.ledger.get(aliceAddress);
        assert.strictEqual(totalSupply.toNumber(), 10000000);
        assert.strictEqual(aliceRecord.balance.toNumber(), 10000000);
    });

    it('should transfer tokens from Alice to Bob', async () => {
        const instance = await Tezos.contract.at(token);
        const value = 1000000;
        await instance.methods.transfer(aliceAddress, bobAddress, value).send();
        await sleep(5000);
        const storage: Storage = await instance.storage();
        const aliceRecord: any = await storage.ledger.get(aliceAddress);
        const bobRecord: any = await storage.ledger.get(bobAddress);
        assert.strictEqual(aliceRecord.balance.toNumber(), 9000000);
        assert.strictEqual(bobRecord.balance.toNumber(), 1000000);
    });

    it("should fail if transfer isn't approved", async () => {
        const instance = await Tezos.contract.at(token);
        const signer = await InMemorySigner.fromSecretKey(bob.sk);
        Tezos.setProvider({ signer });
        const value = 1;
        await assert.rejects(
            instance.methods.transfer(aliceAddress, bobAddress, value).send(),
            (err) => {
                assert.strictEqual(err.message, 'NotPermitted', 'Wrong error message');
                return true;
            },
            'No error is emitted',
        );
    });

    // it('should mint 1 token with 1 nanotez', async () => {
    //     const instance = await Tezos.contract.at(token);
    //     const params: any = { amount: 1 };
    //     await instance.methods.mint(null).send(params);
    //     await sleep(5000);
    //     const storage: Storage = await instance.storage();
    //     const bobRecord: any = await storage.ledger.get(bobAddress);
    //     assert.strictEqual(bobRecord.balance.toNumber(), 1000001);
    // });

    // it('should redeem 2 tokens', async () => {
    //     const instance = await TokenFA12.deployed();
    //     const bobAddress = accounts.bob.pkh;
    //     tezos.setSignerProvider(await InMemorySigner.fromSecretKey(accounts.bob.sk));
    //     await instance.redeem(2);
    //     const storage = await instance.storage();
    //     const bobRecord = await storage.ledger.get(bobAddress);
    //     assert.strictEqual(bobRecord.balance.toNumber(), 1000000);
    // });

    // it('should stake the tokens for Alice', async () => {
    //     tezos.setSignerProvider(await InMemorySigner.fromSecretKey(accounts.alice.sk));
    //     const instance = await TokenFA12.deployed();
    //     const aliceAddress = accounts.alice.pkh;
    //     const stakedAmount = 1000000;
    //     const currentTime = Date.parse((await tezos.rpc.getBlockHeader()).timestamp);
    //     await instance.stake(stakedAmount);
    //     const storage = await instance.storage();
    //     const aliceRecord = await storage.ledger.get(aliceAddress);
    //     assert.strictEqual(aliceRecord.balance.toNumber(), 8000000);
    //     assert.strictEqual(aliceRecord.staked.toNumber(), stakedAmount);
    //     assert.strictEqual(aliceRecord.lastRewardPerShare.toNumber(), 0);
    //     assert.strictEqual(storage.totalSupply.toNumber(), 10000000);
    //     assert.strictEqual(storage.totalStaked.toNumber(), stakedAmount);
    //     assert.strictEqual(storage.rewardPerShare.toNumber(), 0);
    //     assert.strictEqual(Date.parse(storage.lastUpdateTime), currentTime);
    // });

    // it('should assess the reward for Alice', async () => {
    //     const stakedAmount = 1000000;
    //     const instance = await TokenFA12.deployed();
    //     const aliceAddress = accounts.alice.pkh;
    //     const prevStorage = await instance.storage();
    //     await bakeBlocks(3);
    //     const currentTime = Date.parse((await tezos.rpc.getBlockHeader()).timestamp);
    //     const deltaTime = (currentTime - Date.parse(prevStorage.lastUpdateTime)) / 1000;
    //     await instance.stake(0);
    //     const rewardPerSec = 1000000;
    //     const reward = rewardPerSec * deltaTime;
    //     const rewardPerShare = Math.floor(reward / stakedAmount);
    //     const aliceReward = stakedAmount * rewardPerShare;
    //     const storage = await instance.storage();
    //     const aliceRecord = await storage.ledger.get(aliceAddress);
    //     assert.strictEqual(aliceRecord.balance.toNumber(), aliceReward + 8000000);
    //     assert.strictEqual(aliceRecord.staked.toNumber(), stakedAmount);
    //     assert.strictEqual(aliceRecord.lastRewardPerShare.toNumber(), rewardPerShare);
    //     assert.strictEqual(storage.totalSupply.toNumber(), 10000000);
    //     assert.strictEqual(storage.totalStaked.toNumber(), stakedAmount);
    //     assert.strictEqual(storage.rewardPerShare.toNumber(), rewardPerShare);
    // });

    // it('should unstake tokens for Alice', async () => {
    //     const stakedAmount = 1000000;
    //     const instance = await TokenFA12.deployed();
    //     const aliceAddress = accounts.alice.pkh;
    //     await bakeBlocks(3);
    //     const prevStorage = await instance.storage();
    //     const prevAliceRecord = await prevStorage.ledger.get(aliceAddress);
    //     const prevAliceBalance = prevAliceRecord.balance.toNumber();
    //     const currentTime = Date.parse((await tezos.rpc.getBlockHeader()).timestamp);
    //     const deltaTime = (currentTime - Date.parse(prevStorage.lastUpdateTime)) / 1000;
    //     await instance.unstake(stakedAmount);
    //     const rewardPerSec = 1000000;
    //     const reward = rewardPerSec * deltaTime;
    //     const rewardPerShare =
    //         Math.floor(reward / stakedAmount) + prevStorage.rewardPerShare.toNumber();
    //     const aliceReward =
    //         stakedAmount * (rewardPerShare - prevAliceRecord.lastRewardPerShare.toNumber());
    //     const storage = await instance.storage();
    //     const aliceRecord = await storage.ledger.get(aliceAddress);
    //     assert.strictEqual(
    //         aliceRecord.balance.toNumber(),
    //         aliceReward + stakedAmount + prevAliceBalance,
    //     );
    //     assert.strictEqual(aliceRecord.staked.toNumber(), 0);
    //     assert.strictEqual(aliceRecord.lastRewardPerShare.toNumber(), rewardPerShare);
    //     assert.strictEqual(storage.totalSupply.toNumber(), 10000000);
    //     assert.strictEqual(storage.totalStaked.toNumber(), 0);
    //     assert.strictEqual(storage.rewardPerShare.toNumber(), rewardPerShare);
    // });
});
