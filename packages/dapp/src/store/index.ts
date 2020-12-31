import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { contractStorageReducer } from './contract-storage/reducers';
import { uiReducer } from './ui/reducers';

const rootReducer = combineReducers({
    contractStorage: contractStorageReducer,
    ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
    reducer: rootReducer,
});
