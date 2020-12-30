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

export interface TokenContract {
    getStorage(): Promise<TokenContractStorage>;
}

const tokenContract = (): TokenContract => {
    return {
        async getStorage(): Promise<TokenContractStorage> {
            const contract = await Tezos.getTK().contract.at(TOKEN_CONTRACT);
            const storage: TokenContractStorage = await contract.storage();

            return storage;
        },
    };
};

export default tokenContract();
