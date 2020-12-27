import { useCallback } from 'react';
import useBeacon from '../hooks/useBeacon';
import { usePendingPromise } from '../hooks/usePendingPromise';

const TokenBalance: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const { pkh, Tezos } = useBeacon();

    const fetcher = useCallback(async () => {
        const contract = await Tezos.contract.at(contractAddress);

        return contract.views
            .getBalance(pkh)
            .read()
            .catch(() => 0);
    }, [contractAddress, pkh, Tezos.contract]);

    const { fetching, data: balance, error } = usePendingPromise(fetcher);

    return (
        <>
            {!fetching && (balance !== undefined || error)
                ? `tokens: ${balance}` ?? error
                : 'loading..'}
        </>
    );
};

export default TokenBalance;
