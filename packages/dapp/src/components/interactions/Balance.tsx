import { useCallback } from 'react';
import { TezosToolkit } from '@taquito/taquito';
import BigNumber from 'bignumber.js';
import { usePendingPromise } from '../../hooks/usePendingPromise';
import { RPC } from '../../config';

const tk = new TezosToolkit(RPC);

const Balance: React.FC<{ pkh: string }> = ({ pkh }) => {
    const fetcher = useCallback(async () => {
        const balance = await tk.tz.getBalance(pkh);
        return new BigNumber(tk.format('mutez', 'tz', balance)).toFixed(2);
    }, [pkh]);

    const { fetching, data: balance, error } = usePendingPromise(fetcher);

    return (
        <>{!fetching && (balance !== undefined || error) ? `${balance} ꜩ` ?? error : 'loading..'}</>
    );
};

export default Balance;
