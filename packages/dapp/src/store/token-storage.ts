import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tokenContract from '../services/token-contract';

export interface TokenStorageState {
    loading: boolean;
    error: string;
    totalStaked: number;
    rewardPerShare: number;
    totalSupply: number;
}

export const fetchStorage = createAsyncThunk<TokenStorageState>(
    'tokenStorage/fetchStorage',
    async () => {
        const storage = await tokenContract.getStorage();
        return {
            totalStaked: storage.totalStaked.toNumber(),
            totalSupply: storage.totalSupply.toNumber(),
            rewardPerShare: storage.rewardPerShare.toNumber(),
        } as TokenStorageState;
    },
);

const tokenStorageSlice = createSlice({
    name: 'tokenStorage',
    initialState: {
        loading: false,
        error: '',
        totalStaked: 0,
        rewardPerShare: 0,
        totalSupply: 0,
    } as TokenStorageState,
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
            state.totalStaked = payload.totalStaked;
            state.totalSupply = payload.totalSupply;
            state.rewardPerShare = payload.rewardPerShare;
            state.loading = false;
        });
    },
});

export default tokenStorageSlice.reducer;
