import { useCallback } from 'react';
import useBeacon from '../hooks/useBeacon';
import { usePendingPromise } from '../hooks/usePendingPromise';

const ContractStorageInfo: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const { Tezos } = useBeacon();
    const fetcher = useCallback(async () => (await Tezos.contract.at(contractAddress)).storage(), [
        Tezos.contract,
        contractAddress,
    ]);

    const { fetching, data, error } = usePendingPromise(fetcher, JSON.stringify);
    console.log({ fetching, data, error });

    return !fetching && (error || data) ? (
        <div>
            Contract Storage:<pre>{error || data}</pre>
        </div>
    ) : (
        <span>loading...</span>
    );
};

export default ContractStorageInfo;
