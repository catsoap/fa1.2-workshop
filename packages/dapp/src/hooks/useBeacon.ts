import { useCallback, useState } from 'react';
import { BeaconWallet } from '@taquito/beacon-wallet';

import { TezosToolkit } from '@taquito/taquito';
import { NetworkType, PermissionScope } from '@airgap/beacon-sdk';
import { RPC } from '../config';

const options = {
    name: 'FA1.2 interaction dApp',
    iconUrl: 'https://tezostaquito.io/img/favicon.png',
    eventHandlers: {
        PERMISSION_REQUEST_SUCCESS: {
            handler: async (data: any) => {
                console.log('permission data', data);
            },
        },
    },
};

const Tezos = new TezosToolkit(RPC);
const wallet = new BeaconWallet(options);

Tezos.setWalletProvider(wallet);

export default function useBeacon() {
    const [pkh, setUserPkh] = useState<string>();

    const connect = useCallback(async () => {
        await wallet.requestPermissions({
            network: { type: NetworkType.DELPHINET },
            scopes: [
                PermissionScope.OPERATION_REQUEST,
                PermissionScope.SIGN,
                PermissionScope.THRESHOLD,
            ],
        });

        setUserPkh(await wallet.getPKH());
    }, []);

    const disconnect = useCallback(async () => {
        await wallet.disconnect();
        document.location.reload();
    }, []);

    return { connect, disconnect, pkh, Tezos };
}
