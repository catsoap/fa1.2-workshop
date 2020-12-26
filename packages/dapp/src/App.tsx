import React from 'react';
import StorageInfo from './components/StorageInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import { CONTRACT_ADDRESS } from './config';

function App() {
    return (
        <>
            <div className="container g-MainContent">
                <Header contractAddress={CONTRACT_ADDRESS} />
                <StorageInfo contractAddress={CONTRACT_ADDRESS} />
            </div>
            <Footer />
        </>
    );
}

export default App;
