import React from 'react';
import { useDispatch } from 'react-redux';
import Interactions from './components/interactions/Main';
import StorageInfo from './components/StorageInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import { TOKEN_CONTRACT } from './constants';
import { fetchStorage } from './store/token-storage';

function App() {
    const dispatch = useDispatch();
    dispatch(fetchStorage());

    return (
        <>
            <div className="g-MainContent">
                <Header contractAddress={TOKEN_CONTRACT} />
                <StorageInfo />
                <Interactions contractAddress={TOKEN_CONTRACT} />
            </div>
            <Footer />
        </>
    );
}

export default App;
