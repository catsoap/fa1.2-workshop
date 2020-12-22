import React, { useEffect, useState } from 'react';
import contract from '@fa1.2-workshop/contracts/deployments/token';
import './App.css';
import useBeacon from './hooks/useBeacon';

function App() {
    const { connect, pkh } = useBeacon();
    const [image, setImage] = useState('');

    useEffect(() => {
        const tezForce = [
            'https://pbs.twimg.com/media/EptHKhiW8AA1K5G?format=jpg&name=4096x4096',
            'https://pbs.twimg.com/media/EpoSxJkXcAIr0Ti?format=jpg&name=4096x4096',
            'https://pbs.twimg.com/media/Epn0434XYAQXLf9?format=jpg&name=4096x4096',
            'https://pbs.twimg.com/media/Epaibg7WwAA1UAh?format=jpg&name=large',
            'https://ipfs.rarible.com/ipfs/QmerAufVvNGBsMkPt8XS4a4SodQ1V9WnaN1UGWqLKiZ19h/image.gif',
            'https://ipfs.rarible.com/ipfs/QmP2Hjp4CfP8ctjVwQ611Nq3JMurHfDnTD412Thw1UA8CU',
            'https://ipfs.rarible.com/ipfs/QmYdwDZVJyBAEH6KGAbaEStSiHj3ccmCc66s3x8yybFLwA/image.gif',
            'https://ipfs.rarible.com/ipfs/QmQ22DzsUWb6D2nSfTf1vnKu4LMLyjg5n8epiUY5KUbdHD/image.gif',
            'https://ipfs.rarible.com/ipfs/QmcSGYaFB61zv5tD2YSyKoXVsjS8BLFooUbiWoF1ZYsabU/image.gif',
            'https://ipfs.pixura.io/ipfs/QmaXxzfGTN1uYvr83pjkCzWs24jWhJsjaLCGrMHhPMfVyW',
        ];

        const pickRandomImage = (): string => {
            return tezForce[(tezForce.length * Math.random()) << 0];
        };

        const interval = setInterval(() => {
            setImage(pickRandomImage());
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container mx-auto py-4">
            <div className="flex">
                <span className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                    Welcome !
                </span>
                <div className="ml-auto">
                    {!pkh ? (
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                            onClick={connect}
                        >
                            Connect account
                        </button>
                    ) : (
                        <span>{pkh}</span>
                    )}
                </div>
            </div>
            <p>{contract}</p>
            <p>Work in progress, please come back later.</p>
            <div className="flex items-center justify-center">
                <div className="w-1/3">
                    <img src={image} alt="Tezos is awesome" />
                </div>
            </div>
        </div>
    );
}

export default App;
