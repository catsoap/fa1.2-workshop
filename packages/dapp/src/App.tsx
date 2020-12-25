import React from 'react';
import ContractStorageInfo from './components/ContractStorageInfo';
import Account from './components/Account';
import { CONTRACT_ADDRESS } from './config';

function App() {
    return (
        <div className="container py-4 mx-auto">
            <div className="flex">
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                    Welcome !
                </span>
                <Account contractAddress={CONTRACT_ADDRESS} />
            </div>
            <ContractStorageInfo contractAddress={CONTRACT_ADDRESS} />
        </div>
    );
}

export default App;
