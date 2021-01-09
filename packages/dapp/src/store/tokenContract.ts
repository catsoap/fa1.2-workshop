import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOKEN_CONTRACT } from '../constants';
import tokenContract from '../services/token-contract';

export type TokenContractState = {
    address: string;
    loading: boolean;
    error: string;
    lastUpdateTime: number;
    totalStaked: number;
    rewardPerShare: number;
    totalSupply: number;
    ledger: {
        staked: number;
        balance: number;
    };
};

export const fetchStorage = createAsyncThunk<TokenContractState, string | undefined>(
    'tokenContract/fetchStorage',
    async (pkh?: string) => {
        const storage = await tokenContract.getStorage();
        let ledger;
        if (pkh) {
            ledger = await tokenContract.getLedger(storage, pkh).then((ledger) => ({
                staked: ledger ? ledger.staked.toNumber() : 0,
                balance: ledger ? ledger.balance.toNumber() : 0,
            }));
        } else {
            ledger = { staked: 0, balance: 0 };
        }
        const state = {
            lastUpdateTime: new Date(storage.lastUpdateTime).getTime(),
            totalStaked: storage.totalStaked.toNumber(),
            totalSupply: storage.totalSupply.toNumber(),
            rewardPerShare: storage.rewardPerShare.toNumber(),
            ledger,
        };
        return state as TokenContractState;
    },
);

const tokenContractSlice = createSlice({
    name: 'tokenContract',
    initialState: {
        address: TOKEN_CONTRACT,
        loading: false,
        error: '',
        lastUpdateTime: 0,
        totalStaked: 0,
        rewardPerShare: 0,
        totalSupply: 0,
        ledger: { staked: 0, balance: 0 },
    } as TokenContractState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStorage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchStorage.rejected, (state, { payload }) => {
            state.error = 'Could not fetch storage';
            state.loading = false;
        });
        builder.addCase(fetchStorage.fulfilled, (state, { payload }) => {
            state.lastUpdateTime = payload.lastUpdateTime;
            state.totalStaked = payload.totalStaked;
            state.totalSupply = payload.totalSupply;
            state.rewardPerShare = payload.rewardPerShare;
            state.ledger = payload.ledger;
            state.loading = false;
        });
    },
});

export default tokenContractSlice.reducer;
