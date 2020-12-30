import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { contractStorageReducer } from './contract-storage/reducers';

const rootReducer = combineReducers({
    contractStorage: contractStorageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
    reducer: rootReducer,
});
