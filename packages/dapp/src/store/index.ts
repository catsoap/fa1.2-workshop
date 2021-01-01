import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import tokenStorageReducer from './token-storage';
import { uiReducer } from './ui/reducers';

const rootReducer = combineReducers({
    tokenStorage: tokenStorageReducer,
    ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
    reducer: rootReducer,
});
