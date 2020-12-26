import React from 'react';
import ContractStorageInfo from './components/ContractStorageInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import { CONTRACT_ADDRESS } from './config';

function App() {
    return (
        <>
            <div className="container g-MainContent">
                <Header contractAddress={CONTRACT_ADDRESS} />
                <ContractStorageInfo contractAddress={CONTRACT_ADDRESS} />
            </div>
            <Footer />
        </>
    );
}

export default App;
