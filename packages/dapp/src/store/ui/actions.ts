import { UPDATE_UI, UIActionTypes, UIState } from './types';

export function updateUI(newUI: UIState): UIActionTypes {
    return {
        type: UPDATE_UI,
        payload: newUI,
    };
}
