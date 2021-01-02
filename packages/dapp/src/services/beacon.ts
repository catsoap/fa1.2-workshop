import { BeaconWallet } from '@taquito/beacon-wallet';
import Tezos from './tezos';

let globalWallet: BeaconWallet | undefined;

export const connectToBeacon = async () => {
    if (!globalWallet) {
        // Create a new BeaconWallet instance. The options will be passed to the DAppClient constructor.
        const wallet = new BeaconWallet({ name: 'TzButton' });

        // Setting the wallet as the wallet provider for Taquito.
        Tezos.getTK().setWalletProvider(wallet);
        globalWallet = wallet;
    }

    if (await globalWallet.client.getActiveAccount()) {
        // Check if we already have an account connected, so we can skip requestPermissions.
        return globalWallet;
    }

    // Send permission request to the connected wallet. This will either be the browser extension, or a wallet over the P2P network.
    await globalWallet.requestPermissions();

    return globalWallet;
};
