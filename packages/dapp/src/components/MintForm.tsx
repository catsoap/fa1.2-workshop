import { useForm } from 'react-hook-form';
import useBeacon from '../hooks/useBeacon';

type MintParams = {
    amount: number;
};

const MintForm: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const { Tezos } = useBeacon();
    const { register, handleSubmit, errors } = useForm<MintParams>();
    const onSubmit = async (data: MintParams) => {
        const contract = await Tezos.wallet.at(contractAddress);
        const op = await contract.methods.mint(data.amount).send();
        await op.confirmation(1);
    };

    return (
        <form className="c-MintForm" onSubmit={handleSubmit(onSubmit)}>
            <h3>Mint</h3>
            <div>
                <label>
                    <span>Amount:</span>
                    <input
                        className="block w-full mt-1 form-input"
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
            <button>Submit</button>
        </form>
    );
};

export default MintForm;
