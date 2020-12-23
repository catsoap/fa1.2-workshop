import 'mocha';
import * as assert from 'assert';
import { BigMapAbstraction, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { BigNumber } from 'bignumber.js';
import token from '../../deployments/token';
import getConfig, { NetworkConfig } from '../../config';
import getAccounts, { Account } from '../../accounts';

const alice: Account = getAccounts('dev')['alice'];
const bob: Account = getAccounts('dev')['bob'];

const conf: NetworkConfig = getConfig('dev');
const Tezos = new TezosToolkit(conf.node);

type Storage = {
    totalStaked: BigNumber;
    rewardPerShare: BigNumber;
    lastUpdateTime: string;
    totalSupply: BigNumber;
    ledger: BigMapAbstraction;
};

async function bakeBlocks(count) {
    const pkh = await Tezos.signer.publicKeyHash();
    for (let i = 0; i <= count; i += 1) {
        const op = await Tezos.contract.transfer({ to: pkh, amount: 1 });
        await op.confirmation(1, 1);
    }
}

beforeEach(async () => {
    const signer = await InMemorySigner.fromSecretKey(alice.sk);
    Tezos.setProvider({ signer });
});

describe('Token', async () => {
    it('should check initial storage', async () => {
        const instance = await Tezos.contract.at(token);
        const storage: Storage = await instance.storage();
        const { totalSupply } = storage;
        const aliceRecord: any = await storage.ledger.get(alice.pkh);
        assert.strictEqual(totalSupply.toNumber(), 1000);
        assert.strictEqual(aliceRecord.balance.toNumber(), 1000);
    });

    it('should transfer tokens from Alice to Bob', async () => {
        const instance = await Tezos.contract.at(token);
        const value = 100;
        const op = await instance.methods.transfer(alice.pkh, bob.pkh, value).send();
        await op.confirmation(1, 1);
        const storage: Storage = await instance.storage();
        const aliceRecord: any = await storage.ledger.get(alice.pkh);
        const bobRecord: any = await storage.ledger.get(bob.pkh);
        assert.strictEqual(aliceRecord.balance.toNumber(), 900);
        assert.strictEqual(bobRecord.balance.toNumber(), 100);
    });

    it("should fail if transfer isn't approved", async () => {
        const instance = await Tezos.contract.at(token);
        const signer = await InMemorySigner.fromSecretKey(bob.sk);
        Tezos.setProvider({ signer });
        const value = 1;
        await assert.rejects(
            instance.methods.transfer(alice.pkh, bob.pkh, value).send(),
            (err) => {
                assert.strictEqual(err.message, 'NotPermitted', 'Wrong error message');
                return true;
            },
            'No error is emitted',
        );
    });

    it('should mint 1 token', async () => {
        const instance = await Tezos.contract.at(token);
        const signer = await InMemorySigner.fromSecretKey(bob.sk);
        Tezos.setProvider({ signer });
        const op = await instance.methods.default(null).send({ amount: 1 });
        await op.confirmation(1, 1);
        const storage: Storage = await instance.storage();
        const bobRecord: any = await storage.ledger.get(bob.pkh);
        assert.strictEqual(bobRecord.balance.toNumber(), 101);
    });

    it('should redeem 1 token', async () => {
        const instance = await Tezos.contract.at(token);
        const signer = await InMemorySigner.fromSecretKey(bob.sk);
        Tezos.setProvider({ signer });
        const op = await instance.methods.redeem(1).send();
        await op.confirmation(1, 1);
        const storage: Storage = await instance.storage();
        const bobRecord: any = await storage.ledger.get(bob.pkh);
        assert.strictEqual(bobRecord.balance.toNumber(), 100);
    });

    it('should stake the tokens for Alice', async () => {
        const instance = await Tezos.contract.at(token);
        const signer = await InMemorySigner.fromSecretKey(alice.sk);
        Tezos.setProvider({ signer });
        const stakedAmount = 100;
        let currentTime = Date.parse((await Tezos.rpc.getBlockHeader()).timestamp);
        currentTime += 1000;
        const op = await instance.methods.stake(stakedAmount).send();
        await op.confirmation(1, 1);
        const storage: Storage = await instance.storage();
        const aliceRecord: any = await storage.ledger.get(alice.pkh);
        assert.strictEqual(aliceRecord.balance.toNumber(), 800);
        assert.strictEqual(aliceRecord.staked.toNumber(), stakedAmount);
        assert.strictEqual(aliceRecord.lastRewardPerShare.toNumber(), 0);
        assert.strictEqual(storage.totalSupply.toNumber(), 1000);
        assert.strictEqual(storage.totalStaked.toNumber(), stakedAmount);
        assert.strictEqual(storage.rewardPerShare.toNumber(), 0);
        assert.strictEqual(Date.parse(storage.lastUpdateTime), currentTime);
    });

    it('should assess the reward for Alice', async () => {
        const stakedAmount = 100;
        const instance = await Tezos.contract.at(token);
        const signer = await InMemorySigner.fromSecretKey(alice.sk);
        Tezos.setProvider({ signer });
        const prevStorage: Storage = await instance.storage();
        await bakeBlocks(3);
        const currentTime = Date.parse((await Tezos.rpc.getBlockHeader()).timestamp);
        let deltaTime = (currentTime - Date.parse(prevStorage.lastUpdateTime)) / 1000;
        deltaTime += 1;
        const op = await instance.methods.stake(0).send();
        await op.confirmation(1, 1);
        const rewardPerSec = 1000;
        const reward = rewardPerSec * deltaTime;
        const rewardPerShare = Math.floor(reward / stakedAmount);
        const aliceReward = stakedAmount * rewardPerShare;
        const storage: Storage = await instance.storage();
        const aliceRecord: any = await storage.ledger.get(alice.pkh);
        assert.strictEqual(aliceRecord.balance.toNumber(), aliceReward + 800);
        assert.strictEqual(aliceRecord.staked.toNumber(), stakedAmount);
        assert.strictEqual(aliceRecord.lastRewardPerShare.toNumber(), rewardPerShare);
        assert.strictEqual(storage.totalSupply.toNumber(), 1000);
        assert.strictEqual(storage.totalStaked.toNumber(), stakedAmount);
        assert.strictEqual(storage.rewardPerShare.toNumber(), rewardPerShare);
    });

    it('should unstake tokens for Alice', async () => {
        const stakedAmount = 100;
        const instance = await Tezos.contract.at(token);
        const signer = await InMemorySigner.fromSecretKey(alice.sk);
        Tezos.setProvider({ signer });
        await bakeBlocks(3);
        const prevStorage: Storage = await instance.storage();
        const prevAliceRecord: any = await prevStorage.ledger.get(alice.pkh);
        const prevAliceBalance = prevAliceRecord.balance.toNumber();
        let currentTime = Date.parse((await Tezos.rpc.getBlockHeader()).timestamp);
        let deltaTime = (currentTime - Date.parse(prevStorage.lastUpdateTime)) / 1000;
        currentTime += 1;
        deltaTime += 1;
        const op = await instance.methods.unstake(stakedAmount).send();
        await op.confirmation(1, 1);
        const rewardPerSec = 1000;
        const reward = rewardPerSec * deltaTime;
        const rewardPerShare =
            Math.floor(reward / stakedAmount) + prevStorage.rewardPerShare.toNumber();
        const aliceReward =
            stakedAmount * (rewardPerShare - prevAliceRecord.lastRewardPerShare.toNumber());
        const storage: Storage = await instance.storage();
        const aliceRecord: any = await storage.ledger.get(alice.pkh);
        assert.strictEqual(
            aliceRecord.balance.toNumber(),
            aliceReward + stakedAmount + prevAliceBalance,
        );
        assert.strictEqual(aliceRecord.staked.toNumber(), 0);
        assert.strictEqual(aliceRecord.lastRewardPerShare.toNumber(), rewardPerShare);
        assert.strictEqual(storage.totalSupply.toNumber(), 1000);
        assert.strictEqual(storage.totalStaked.toNumber(), 0);
        assert.strictEqual(storage.rewardPerShare.toNumber(), rewardPerShare);
    });
});
