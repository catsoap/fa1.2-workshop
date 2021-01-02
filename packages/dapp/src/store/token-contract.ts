import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOKEN_CONTRACT } from '../constants';
import tokenContract from '../services/token-contract';

export interface TokenContractState {
    address: string;
    loading: boolean;
    error: string;
    lastUpdateTime: number;
    totalStaked: number;
    rewardPerShare: number;
    totalSupply: number;
}

export const fetchStorage = createAsyncThunk<TokenContractState>(
    'tokenContract/fetchStorage',
    async () => {
        const storage = await tokenContract.getStorage();
        return {
            lastUpdateTime: new Date(storage.lastUpdateTime).getTime(),
            totalStaked: storage.totalStaked.toNumber(),
            totalSupply: storage.totalSupply.toNumber(),
            rewardPerShare: storage.rewardPerShare.toNumber(),
        } as TokenContractState;
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
            state.loading = false;
        });
    },
});

export default tokenContractSlice.reducer;
