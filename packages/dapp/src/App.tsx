import React from 'react';
import Account from './components/Account';
import StorageInfo from './components/StorageInfo';
import TransferForm from './components/TransferForm';
import MintForm from './components/MintForm';
import Header from './components/Header';
import Footer from './components/Footer';
import { CONTRACT_ADDRESS } from './config';

function App() {
    return (
        <>
            <div className="g-MainContent">
                <Header contractAddress={CONTRACT_ADDRESS} />
                <Account contractAddress={CONTRACT_ADDRESS} />
                <StorageInfo contractAddress={CONTRACT_ADDRESS} />
                <div className="c-Forms">
                    <div>
                        <TransferForm contractAddress={CONTRACT_ADDRESS} />
                    </div>
                    <div>
                        <MintForm contractAddress={CONTRACT_ADDRESS} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default App;
