import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import Tezos from '../services/tezos';
import { walletPKH, connectWallet, disconnectWallet } from '../services/beacon';

export interface WalletAccountState {
    loading: boolean;
    error: string;
    pkh: string | undefined;
    balance: string;
}

const initialState = {
    loading: false,
    error: '',
    pkh: undefined,
    balance: '0',
} as WalletAccountState;

export const walletConnect = createAsyncThunk<WalletAccountState>(
    'walletAccount/connect',
    async () => {
        await connectWallet();
        const pkh = await walletPKH();
        const bal = await Tezos.getTK().tz.getBalance(pkh);
        const balance = new BigNumber(Tezos.getTK().format('mutez', 'tz', bal)).toFixed(2);

        return { pkh, balance } as WalletAccountState;
    },
);

export const walletDisconnect = createAsyncThunk<WalletAccountState>(
    'walletAccount/diconnect',
    async () => {
        await disconnectWallet();

        return { pkh: undefined } as WalletAccountState;
    },
);

export const fetchBalance = createAsyncThunk<WalletAccountState, string | undefined>(
    'walletAccount/fetchBalance',
    async (pkh?: string) => {
        const payload = { pkh } as WalletAccountState;
        if (pkh) {
            const balance = await Tezos.getTK().tz.getBalance(pkh);
            payload.balance = new BigNumber(Tezos.getTK().format('mutez', 'tz', balance)).toFixed(
                2,
            );
        }
        return payload;
    },
);

const walletAccountSlice = createSlice({
    name: 'walletAccount',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBalance.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchBalance.rejected, (state, { payload }) => {
            state.error = 'Could not fetch balance';
            state.loading = false;
        });
        builder.addCase(fetchBalance.fulfilled, (state, { payload }) => {
            state.pkh = payload.pkh;
            state.balance = payload.balance;
            state.loading = false;
        });
        builder.addCase(walletConnect.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(walletConnect.rejected, (state, { payload }) => {
            state.error = 'Could not connect wallet';
            state.loading = false;
        });
        builder.addCase(walletConnect.fulfilled, (state, { payload }) => {
            state.pkh = payload.pkh;
            state.balance = payload.balance;
            state.loading = false;
        });
        builder.addCase(walletDisconnect.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(walletDisconnect.rejected, (state, { payload }) => {
            state.error = 'Could not connect wallet';
            state.loading = false;
        });
        builder.addCase(walletDisconnect.fulfilled, (state, { payload }) => {
            state.pkh = undefined;
            state.loading = false;
        });
    },
});

export default walletAccountSlice.reducer;
