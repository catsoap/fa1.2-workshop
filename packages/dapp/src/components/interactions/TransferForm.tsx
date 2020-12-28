import { useForm } from 'react-hook-form';
import useBeacon from '../../hooks/useBeacon';
import { validateAddress, ValidationResult } from '@taquito/utils';

type TransferParams = {
    sender: string;
    receiver: string;
    amount: number;
};

const TransferForm: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const { Tezos } = useBeacon();
    const { register, handleSubmit, errors } = useForm<TransferParams>();
    const onSubmit = async (data: TransferParams) => {
        const contract = await Tezos.wallet.at(contractAddress);
        const op = await contract.methods.transfer(data.sender, data.receiver, data.amount).send();
        await op.confirmation(1);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Transfer</h3>
            <div>
                <label>
                    <span>Sender:</span>
                    <input
                        aria-invalid={errors.sender ? 'true' : 'false'}
                        ref={register({
                            validate: (value) => validateAddress(value) === ValidationResult.VALID,
                        })}
                        name="sender"
                        placeholder="tz1xxx1234"
                        type="text"
                    />
                    {errors.sender && (
                        <p className="g-ErrorMessage" role="alert">
                            Please enter a valid address
                        </p>
                    )}
                </label>
            </div>
            <div>
                <label>
                    <span>Receiver:</span>
                    <input
                        aria-invalid={errors.receiver ? 'true' : 'false'}
                        ref={register({
                            validate: (value) => validateAddress(value) === ValidationResult.VALID,
                        })}
                        name="receiver"
                        placeholder="tz1xxx1234"
                        type="text"
                    />
                    {errors.receiver && (
                        <p className="g-ErrorMessage" role="alert">
                            Please enter a valid address
                        </p>
                    )}
                </label>
            </div>
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
            <button>Transfer</button>
        </form>
    );
};

export default TransferForm;
