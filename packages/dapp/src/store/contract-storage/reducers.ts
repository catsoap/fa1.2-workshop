import { ContractStorageState, ContractStorageActionTypes, UPDATE_CONTRACT_STORAGE } from './types';

const initialState: ContractStorageState = {
    totalStaked: 0,
    rewardPerShare: 0,
    totalSupply: 0,
};

export function contractStorageReducer(
    state = initialState,
    action: ContractStorageActionTypes,
): ContractStorageState {
    switch (action.type) {
        case UPDATE_CONTRACT_STORAGE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
