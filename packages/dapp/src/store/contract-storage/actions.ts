import { UPDATE_CONTRACT_STORAGE, ContractStorageActionTypes, ContractStorageState } from './types';

export function updateContractStorage(
    newContractStorage: ContractStorageState,
): ContractStorageActionTypes {
    return {
        type: UPDATE_CONTRACT_STORAGE,
        payload: newContractStorage,
    };
}
