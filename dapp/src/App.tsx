import React from 'react';
import { ReactComponent as Logo } from "./svg/Tezos_logo.svg";
import contract from '@fa1.2-workshop/contracts/deployments/token';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Logo />
      </header>
      {contract}
    </div>
  );
}

export default App;
