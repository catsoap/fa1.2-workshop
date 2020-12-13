const { alice } = require('./scripts/sandbox/accounts');

module.exports = {
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  networks: {
    development: {
      host: 'http://localhost',
      port: 8732,
      network_id: '*',
      secretKey: alice.sk,
      type: 'tezos',
    },
    delphinet: {
      host: 'https://delphinet.smartpy.io',
      port: 443,
      network_id: '*',
      type: 'tezos',
      secretKey: 'edskRvudXha2WHuzD9tmLx4AdrUMz4NBQGLvbio82FTvzc6nG4gsuUhGiv6CDfaU5w6cXcdsEuWf93gU31daMa7gAtN7ygwvBt',
    },
  },
};
