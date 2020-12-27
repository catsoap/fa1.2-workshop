import React from 'react';
import Interactions from './components/interactions/Main';
import StorageInfo from './components/StorageInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import { CONTRACT_ADDRESS } from './config';

function App() {
    return (
        <>
            <div className="g-MainContent">
                <Header contractAddress={CONTRACT_ADDRESS} />
                <StorageInfo contractAddress={CONTRACT_ADDRESS} />
                <Interactions contractAddress={CONTRACT_ADDRESS} />
            </div>
            <Footer />
        </>
    );
}

export default App;
