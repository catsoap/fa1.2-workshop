import { useCallback } from 'react';
import { BigMapAbstraction, TezosToolkit } from '@taquito/taquito';
import { usePendingPromise } from '../../hooks/usePendingPromise';
import { Storage } from '../../TokenContract';
import { BigNumber } from 'bignumber.js';

type Ledger = {
    allowances: BigMapAbstraction;
    balance: BigNumber;
    staked: BigNumber;
    rewardPerShare: BigNumber;
};

const TokenBalance: React.FC<{ contractAddress: string; pkh: string; tezos: TezosToolkit }> = ({
    contractAddress,
    pkh,
    tezos,
}) => {
    const fetcher = useCallback(async () => {
        const contract = await tezos.contract.at(contractAddress);
        const storage: Storage = await contract.storage();
        const ledger = await storage.ledger.get(pkh);
        return (
            ledger ?? {
                balance: new BigNumber(0),
                staked: new BigNumber(0),
            }
        );
    }, [contractAddress, pkh, tezos.contract]);

    const { fetching, data, error } = usePendingPromise(fetcher);
    let ledger: Ledger;
    ledger = (data as unknown) as Ledger;
    const balance = ledger ? ledger.balance.toNumber() : 0;
    const staked = ledger ? ledger.staked.toNumber() : 0;

    return (
        <>
            {!fetching && (ledger || error) ? (
                ledger ? (
                    <>
                        {`tokens: ${balance}`}
                        <br />
                        {`staked: ${staked}`}
                    </>
                ) : (
                    error
                )
            ) : (
                'loading..'
            )}
        </>
    );
};

export default TokenBalance;
