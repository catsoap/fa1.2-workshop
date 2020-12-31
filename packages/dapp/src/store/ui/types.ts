export interface UIState {
    contractStorageLoading: boolean;
}

export const UPDATE_UI = 'UPDATE_UI';

interface UpdateUIAction {
    type: typeof UPDATE_UI;
    payload: UIState;
}

export type UIActionTypes = UpdateUIAction;
