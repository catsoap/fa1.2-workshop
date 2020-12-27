import { useCallback } from 'react';
import { TezosToolkit } from '@taquito/taquito';
import { usePendingPromise } from '../../hooks/usePendingPromise';

const TokenBalance: React.FC<{ contractAddress: string; pkh: string; tezos: TezosToolkit }> = ({
    contractAddress,
    pkh,
    tezos,
}) => {
    const fetcher = useCallback(async () => {
        const contract = await tezos.contract.at(contractAddress);

        return contract.views
            .getBalance(pkh)
            .read()
            .catch((e) => {
                console.log(e);
                return 0;
            });
    }, [contractAddress, pkh, tezos.contract]);

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
