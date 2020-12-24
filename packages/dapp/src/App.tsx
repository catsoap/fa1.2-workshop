import React from 'react';
import { ContractStorageInfo } from './components/ContractStorageInfo';
import { CONTRACT_ADDRESS } from './config';
import useBeacon from './hooks/useBeacon';

function App() {
    const { connect, pkh } = useBeacon();

    return (
        <div className="container mx-auto py-4">
            <div className="flex">
                <span className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                    Welcome !
                </span>
                <div className="ml-auto">
                    {!pkh ? (
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                            onClick={connect}
                        >
                            Connect account
                        </button>
                    ) : (
                        <span>{pkh}</span>
                    )}
                </div>
            </div>
            <ContractStorageInfo contractAddress={CONTRACT_ADDRESS} />
        </div>
    );
}

export default App;
