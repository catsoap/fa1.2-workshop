import accounts from './scripts/sandbox/accounts';

type Config = {
    [key: string]: NetworkConfig;
};

export type NetworkConfig = {
    node: string;
    publicKeyHash: string;
    secretKey: string;
};

const config: Config = {
    dev: {
        node: 'http://localhost:8732',
        publicKeyHash: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
        secretKey: accounts['alice'].sk,
    },
    testnet: {
        node: 'https://testnet-tezos.giganode.io/',
        publicKeyHash: 'tz1XQDJorhbH54asBbXimyTm3LKd8H4RxKCG',
        secretKey:
            'edskRvudXha2WHuzD9tmLx4AdrUMz4NBQGLvbio82FTvzc6nG4gsuUhGiv6CDfaU5w6cXcdsEuWf93gU31daMa7gAtN7ygwvBt',
    },
    next: {
        node: 'https://edonet-tezos.giganode.io/',
        publicKeyHash: 'tz1XQDJorhbH54asBbXimyTm3LKd8H4RxKCG',
        secretKey:
            'edskRvudXha2WHuzD9tmLx4AdrUMz4NBQGLvbio82FTvzc6nG4gsuUhGiv6CDfaU5w6cXcdsEuWf93gU31daMa7gAtN7ygwvBt',
    },
};

export default (env: string): NetworkConfig => config[env];
