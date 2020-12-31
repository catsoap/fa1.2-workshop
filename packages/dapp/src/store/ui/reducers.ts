import { UIState, UIActionTypes, UPDATE_UI } from './types';

const initialState: UIState = {
    contractStorageLoading: true,
};

export function uiReducer(state = initialState, action: UIActionTypes): UIState {
    switch (action.type) {
        case UPDATE_UI:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
