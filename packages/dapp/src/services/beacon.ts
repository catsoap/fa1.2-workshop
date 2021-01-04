import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType, PermissionScope } from '@airgap/beacon-sdk';
import Tezos from './tezos';

let globalWallet: BeaconWallet | undefined;

export const isWalletConnected = () => {
    return globalWallet !== undefined;
};

export const connectWallet = async () => {
    if (!globalWallet) {
        const options = {
            name: 'FA1.2 Workshop',
            eventHandlers: {
                PERMISSION_REQUEST_SUCCESS: {
                    handler: async (data: any) => {
                        console.log('permission data', data);
                    },
                },
            },
        };

        const wallet = new BeaconWallet(options);

        Tezos.getTK().setWalletProvider(wallet);
        globalWallet = wallet;

        await wallet.requestPermissions({
            network: { type: NetworkType.DELPHINET },
            scopes: [
                PermissionScope.OPERATION_REQUEST,
                PermissionScope.SIGN,
                PermissionScope.THRESHOLD,
            ],
        });
    }

    if (await globalWallet.client.getActiveAccount()) {
        return globalWallet;
    }

    await globalWallet.requestPermissions();

    return globalWallet;
};

export const disconnectWallet = async () =>
    globalWallet && isWalletConnected && (await globalWallet.disconnect());

export const walletPKH = () => Tezos.getTK().wallet.pkh();
