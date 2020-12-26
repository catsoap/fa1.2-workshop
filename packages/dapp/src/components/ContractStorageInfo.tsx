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

const toStorage = (result: any): Storage => result;

const ContractStorageInfo: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const { Tezos } = useBeacon();
    const fetcher = useCallback(async () => (await Tezos.contract.at(contractAddress)).storage(), [
        Tezos.contract,
        contractAddress,
    ]);

    const { fetching, data, error } = usePendingPromise(fetcher);
    const storage: Storage = toStorage(data);
    console.log(storage);

    return !fetching ? (
        error || !storage ? (
            <p className="font-bold text-red-500">{error || 'Something went wrong'}</p>
        ) : (
            <div className="flex">
                <div className="flex-1 py-8">
                    <h2>Reward Per Share</h2>
                    <span>{storage.rewardPerShare.toNumber()}</span>
                </div>
                <div className="flex-1 py-8">
                    <h2>Total Staked</h2>
                    <span>{storage.totalStaked.toNumber()}</span>
                </div>
                <div className="flex-1 py-8">
                    <h2>Total Supply</h2>
                    <span>{storage.totalSupply.toNumber()}</span>
                </div>
            </div>
        )
    ) : (
        <span>loading...</span>
    );
};

export default ContractStorageInfo;
