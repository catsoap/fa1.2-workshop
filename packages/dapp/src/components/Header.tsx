import React from 'react';
import { ReactComponent as TezosLogo } from '../svg/Tezos_logo.svg';

const Footer: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    return (
        <div className="g-Header">
            <h1>
                <TezosLogo />
                <span>FA1.2 Workshop</span>
                <a href={`https://better-call.dev/delphinet/${contractAddress}`}>
                    / <span>{contractAddress}</span>
                </a>
            </h1>
        </div>
    );
};

export default Footer;
