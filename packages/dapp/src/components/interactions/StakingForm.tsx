import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import tokenContract from '../../services/token-contract';
import { fetchStorage } from '../../store/tokenContract';
import { WalletAccountState } from '../../store/walletAccount';
import { RootState } from '../../store';

type FormData = {
    amount: number;
};

const StakingForm: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const [action, setAction] = useState<string>();
    const walletAccount: WalletAccountState = useSelector(
        (state: RootState) => state.walletAccount,
    );
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm<FormData>();
    const onSubmit = async (data: FormData) => {
        if (action) {
            await tokenContract.staking(action, data.amount);
            dispatch(fetchStorage(walletAccount.pkh));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Staking</h3>
            <div>
                <label>
                    <span>Amount:</span>
                    <input
                        name="amount"
                        ref={register({
                            validate: (value) => value > 0,
                        })}
                        type="number"
                    />
                    {errors.amount && (
                        <p className="g-FormError" role="alert">
                            Please enter an amount greater than 0
                        </p>
                    )}
                </label>
            </div>
            <div className="i-Staking_buttons">
                <button onClick={() => setAction('stake')}>Stake</button>
                <button onClick={() => setAction('unstake')}>Unstake</button>
            </div>
        </form>
    );
};

export default StakingForm;
