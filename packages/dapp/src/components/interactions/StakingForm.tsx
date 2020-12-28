import { useForm } from 'react-hook-form';
import useBeacon from '../../hooks/useBeacon';

type StakingParams = {
    amount: number;
};

const StakingForm: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const { Tezos } = useBeacon();
    const { register, handleSubmit, errors } = useForm<StakingParams>();
    const onSubmit = async (data: StakingParams) => {
        const contract = await Tezos.wallet.at(contractAddress);
        const op = await contract.methods.default(null).send(data);
        await op.confirmation(1);
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
                <button>Stake</button>
                <button>Unstake</button>
            </div>
        </form>
    );
};

export default StakingForm;
