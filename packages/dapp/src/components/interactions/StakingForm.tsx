import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useBeacon from '../../hooks/useBeacon';

type FormData = {
    amount: number;
};

const StakingForm: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const { Tezos } = useBeacon();
    const [action, setAction] = useState<string>();
    const { register, handleSubmit, errors } = useForm<FormData>();
    const onSubmit = async (data: FormData) => {
        const contract = await Tezos.wallet.at(contractAddress);
        if (action) {
            const { amount } = data;
            const op = await contract.methods[action](amount).send();
            await op.confirmation(1);
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
