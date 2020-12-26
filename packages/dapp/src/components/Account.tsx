import { useCallback } from 'react';
import useBeacon from '../hooks/useBeacon';
import { usePendingPromise } from '../hooks/usePendingPromise';

const Account: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const { connect, disconnect, pkh, Tezos } = useBeacon();

    const fetcher = useCallback(async () => {
        const contract = await Tezos.contract.at(contractAddress);

        return contract.views
            .getBalance(pkh)
            .read()
            .catch(() => 0);
    }, [contractAddress, pkh, Tezos.contract]);

    const { fetching, data: balance, error } = usePendingPromise(fetcher);

    return (
        <div className="ml-auto">
            {!pkh ? (
                <button
                    className="inline-flex items-center px-4 py-2 font-bold text-white bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-400 hover:border-blue-500"
                    onClick={connect}
                >
                    <svg
                        className="w-4 h-4 mr-2 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                    </svg>
                    Connect account
                </button>
            ) : (
                <div className="flex flex-row items-center">
                    <div className="flex flex-col mr-2">
                        <span>{pkh}</span>
                        <span className="text-right">
                            {!fetching && (balance !== undefined || error)
                                ? `tokens: ${balance}` ?? error
                                : 'loading..'}
                        </span>
                    </div>
                    <button
                        className="inline-flex items-center px-4 py-2 font-bold text-white bg-yellow-500 border-b-4 border-yellow-700 rounded hover:bg-yellow-400 hover:border-yellow-500"
                        onClick={disconnect}
                    >
                        <svg
                            className="w-4 h-4 mr-2 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    );
};

export default Account;
