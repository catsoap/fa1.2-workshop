import { TezosToolkit } from '@taquito/taquito';
import { RPC } from '../constants';

export interface Tezos {
    getTK(): TezosToolkit;
}

const tezos = (rpc: string): Tezos => {
    const tk = new TezosToolkit(RPC);

    return {
        getTK: (): TezosToolkit => tk,
    };
};

export default tezos(RPC);
