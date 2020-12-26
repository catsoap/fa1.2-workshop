import React from 'react';
import Account from './Account';
import { ReactComponent as TezosLogo } from '../svg/Tezos_logo.svg';

const Footer: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    return (
        <div className="flex my-4">
            <h1>
                <TezosLogo />
                Token demo
            </h1>
            <Account contractAddress={contractAddress} />
        </div>
    );
};

export default Footer;
