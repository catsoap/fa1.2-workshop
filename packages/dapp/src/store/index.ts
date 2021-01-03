import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import tokenContractReducer from './tokenContract';
import walletAccountReducer from './walletAccount';

const rootReducer = combineReducers({
    tokenContract: tokenContractReducer,
    walletAccount: walletAccountReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
    reducer: rootReducer,
});
