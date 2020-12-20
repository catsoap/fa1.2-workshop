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
        secretKey: 'edsk3RFfvaFaxbHx8BMtEW1rKQcPtDML3LXjNqMNLCzC3wLC1bWbAt',
    },
    delphi: {
        node: 'https://delphinet.smartpy.io',
        publicKeyHash: 'tz1XQDJorhbH54asBbXimyTm3LKd8H4RxKCG',
        secretKey:
            'edskRvudXha2WHuzD9tmLx4AdrUMz4NBQGLvbio82FTvzc6nG4gsuUhGiv6CDfaU5w6cXcdsEuWf93gU31daMa7gAtN7ygwvBt',
    },
};

export default (env: string): NetworkConfig => config[env];
