import { TezosToolkit, MichelsonMap } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import saveContractAddress from '../helpers/saveContractAddress';
import getConfig, { NetworkConfig } from '../config';
import code from '../build/token.json';

const args = process.argv;
const env = args[2];

if (env == undefined || !['dev', 'delphi'].includes(env)) {
    console.log('please supply valid env.');
    process.exit(1);
}

const conf: NetworkConfig = getConfig(env);
const Tezos = new TezosToolkit(conf.node);

const deploy = async () => {
    try {
        const signer = await InMemorySigner.fromSecretKey(conf.secretKey);
        Tezos.setProvider({ signer });

        const totalSupply = '10000000';
        const totalStaked = '0';
        const rewardPerShare = '0';
        const lastUpdateTime = '0';
        const storage = {
            totalStaked,
            rewardPerShare,
            lastUpdateTime,
            totalSupply,
            ledger: MichelsonMap.fromLiteral({
                [conf.publicKeyHash]: {
                    balance: totalSupply,
                    staked: totalStaked,
                    lastRewardPerShare: lastUpdateTime,
                    allowances: MichelsonMap.fromLiteral({}),
                },
            }),
        };

        const op = await Tezos.contract.originate({
            code,
            storage,
        });
        saveContractAddress('token', op.contractAddress);
    } catch (e) {
        console.log(e);
    }
};

deploy();
