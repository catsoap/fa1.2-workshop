import { useForm } from 'react-hook-form';
import useBeacon from '../../hooks/useBeacon';

type MintParams = {
    amount: number;
};

const MintForm: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const { Tezos } = useBeacon();
    const { register, handleSubmit, errors } = useForm<MintParams>();
    const onSubmit = async (data: MintParams) => {
        const contract = await Tezos.wallet.at(contractAddress);
        const op = await contract.methods.default(null).send(data);
        await op.confirmation(1);
    };

    return (
        <form className="i-MintForm" onSubmit={handleSubmit(onSubmit)}>
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
