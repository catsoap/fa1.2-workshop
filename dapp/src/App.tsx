import React from 'react';
import './App.css';

function App() {
    const {connect, pkh} = useBeacon

  return (
    <div className="App">
        <button>
            Connect wallet
        </button>
    </div>
  );
}

export default App;
