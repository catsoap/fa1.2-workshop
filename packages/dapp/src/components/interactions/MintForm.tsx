import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { WalletAccountState } from '../../store/walletAccount';
import { RootState } from '../../store';
import { fetchBalance } from '../../store/walletAccount';
import { fetchStorage } from '../../store/tokenContract';
import tokenContract from '../../services/token-contract';

type FormData = {
    amount: number;
};

const MintForm: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const walletAccount: WalletAccountState = useSelector(
        (state: RootState) => state.walletAccount,
    );

    const { register, handleSubmit, errors } = useForm<FormData>();
    const dispatch = useDispatch();

    const onSubmit = async (data: FormData) => {
        await tokenContract.mint(data.amount);
        dispatch(fetchBalance(walletAccount.pkh));
        dispatch(fetchStorage(walletAccount.pkh));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Mint</h3>
            <div>
                <label>
                    <span>Amount:</span>
                    <input
                        defaultValue={25}
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
            <button>Mint</button>
        </form>
    );
};

export default MintForm;
