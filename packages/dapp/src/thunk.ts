import { Action } from 'redux';
import { RootState } from './store';
import { ThunkAction } from 'redux-thunk';
import tokenContract from './services/token-contract';
import { updateContractStorage } from './store/contract-storage/actions';

export const getStorage = (): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    const storage = await tokenContract.getStorage();
    dispatch(
        updateContractStorage({
            totalStaked: storage.totalStaked.toNumber(),
            totalSupply: storage.totalSupply.toNumber(),
            rewardPerShare: storage.rewardPerShare.toNumber(),
        }),
    );
};
