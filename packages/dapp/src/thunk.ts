import { Action } from 'redux';
import { RootState } from './store';
import { ThunkAction } from 'redux-thunk';
import tokenContract from './services/token-contract';
import { updateContractStorage } from './store/contract-storage/actions';
import { updateUI } from './store/ui/actions';

export const getStorage = (
    pkh?: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    dispatch(updateUI({ contractStorageLoading: true }));
    const storage = await tokenContract.getStorage(pkh);
    dispatch(
        updateContractStorage({
            totalStaked: storage.totalStaked.toNumber(),
            totalSupply: storage.totalSupply.toNumber(),
            rewardPerShare: storage.rewardPerShare.toNumber(),
        }),
    );
    dispatch(updateUI({ contractStorageLoading: false }));
};
