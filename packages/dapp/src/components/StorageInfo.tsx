import { useCallback } from 'react';
import useBeacon from '../hooks/useBeacon';
import { BigMapAbstraction } from '@taquito/taquito';
import { BigNumber } from 'bignumber.js';
import { usePendingPromise } from '../hooks/usePendingPromise';

type Storage = {
    totalStaked: BigNumber;
    rewardPerShare: BigNumber;
    lastUpdateTime: string;
    totalSupply: BigNumber;
    ledger: BigMapAbstraction;
};

type Counter = {
    label: string;
    count: number;
};

const toStorage = (result: any): Storage => result;

const StorageInfo: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const { Tezos } = useBeacon();
    const fetcher = useCallback(async () => (await Tezos.contract.at(contractAddress)).storage(), [
        Tezos.contract,
        contractAddress,
    ]);

    const { fetching, data, error } = usePendingPromise(fetcher);
    const storage: Storage = toStorage(data);

    const renderCounter = (c: Counter) => (
        <div>
            <div>
                <h2>{c.label}</h2>
                <span>{c.count}</span>
            </div>
        </div>
    );

    const renderCounters = (s: Storage) => {
        const counters: Counter[] = [
            { label: 'Reward Per Share', count: s.rewardPerShare.toNumber() },
            { label: 'Total Staked', count: s.totalStaked.toNumber() },
            { label: 'Total Supply', count: s.totalSupply.toNumber() },
        ];

        return counters.map(renderCounter);
    };

    return !fetching ? (
        error || !storage ? (
            <p className="font-bold text-red-500">{error || 'Something went wrong'}</p>
        ) : (
            <div className="c-StorageInfo">{renderCounters(storage)}</div>
        )
    ) : (
        <span>loading...</span>
    );
};

export default StorageInfo;
