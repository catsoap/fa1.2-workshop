import { TOKEN_CONTRACT } from '../constants';
import { BigMapAbstraction } from '@taquito/taquito';
import { BigNumber } from 'bignumber.js';
import Tezos from './tezos';

export interface TokenContractStorage {
    totalStaked: BigNumber;
    rewardPerShare: BigNumber;
    lastUpdateTime: string;
    totalSupply: BigNumber;
    ledger: BigMapAbstraction;
}

export interface TokenContractLedger {
    allowances: BigMapAbstraction;
    balance: BigNumber;
    staked: BigNumber;
    rewardPerShare: BigNumber;
}

export interface TokenContract {
    getStorage(pkh?: string): Promise<TokenContractStorage>;
    getLedger(storage: TokenContractStorage, key: string): Promise<TokenContractLedger>;
}

const tokenContract = (): TokenContract => {
    return {
        async getStorage(): Promise<TokenContractStorage> {
            const contract = await Tezos.getTK().contract.at(TOKEN_CONTRACT);
            const storage: TokenContractStorage = await contract.storage();

            return storage;
        },

        async getLedger(storage: TokenContractStorage, key: string): Promise<TokenContractLedger> {
            return storage.ledger.get(key) as Promise<TokenContractLedger>;
        },
    };
};

export default tokenContract();
