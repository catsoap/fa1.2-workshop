import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import tokenContractReducer from './token-contract';

const rootReducer = combineReducers({
    tokenContract: tokenContractReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
    reducer: rootReducer,
});
