export interface ContractStorageState {
    totalStaked: number;
    rewardPerShare: number;
    totalSupply: number;
}

export const UPDATE_CONTRACT_STORAGE = 'UPDATE_CONTRACT_STORAGE';

interface UpdateContractStorageAction {
    type: typeof UPDATE_CONTRACT_STORAGE;
    payload: ContractStorageState;
}

export type ContractStorageActionTypes = UpdateContractStorageAction;
