import { expect } from 'chai';
import 'mocha';
import * as assert from 'assert';
import { BigMapAbstraction, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { BigNumber } from 'bignumber.js';
import token from '../deployments/token';
import getConfig, { NetworkConfig } from '../config';
import accounts from '../scripts/sandbox/accounts';

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
        const storage: Storage = await instance.storage();
        const aliceRecord: any = await storage.ledger.get(aliceAddress);
        const bobRecord: any = await storage.ledger.get(bobAddress);
        assert.strictEqual(aliceRecord.balance.toNumber(), 9000000);
        assert.strictEqual(bobRecord.balance.toNumber(), 1000000);
    });
});
