import { TezosToolkit } from '@taquito/taquito';
import BigNumber from 'bignumber.js';
import { RPC } from '../constants';

export type Tezos = {
    getTK(): TezosToolkit;
    getBalance(pkh: string): Promise<string>;
};

const tezos = (rpc: string): Tezos => {
    const tk = new TezosToolkit(RPC);

    return {
        getTK: (): TezosToolkit => tk,
        async getBalance(pkh: string): Promise<string> {
            const balance = await tk.tz.getBalance(pkh);

            return new BigNumber(tk.format('mutez', 'tz', balance)).toFixed(2);
        },
    };
};

export default tezos(RPC);
