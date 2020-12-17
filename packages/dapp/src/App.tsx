import React from 'react';
import contract from '@fa1.2-workshop/contracts/deployments/token';
import './App.css';
import useBeacon from './hooks/useBeacon';

function App() {
    const { connect, pkh } = useBeacon();

    return (
        <div className="container mx-auto">
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
        </div>
    );
}

export default App;
