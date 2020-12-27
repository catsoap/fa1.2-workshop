import { useForm } from 'react-hook-form';
import useBeacon from '../hooks/useBeacon';
import { validateAddress, ValidationResult } from '@taquito/utils';

type TransferParams = {
    to: string;
    amount: number;
};

const TransferForm: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const { pkh, Tezos } = useBeacon();
    const { register, handleSubmit, errors } = useForm<TransferParams>();
    const onSubmit = async (data: TransferParams) => {
        const contract = await Tezos.wallet.at(contractAddress);
        const op = await contract.methods.transfer(pkh, data.to, data.amount).send();
        await op.confirmation(1);
    };

    return (
        <form className="c-TransferForm" onSubmit={handleSubmit(onSubmit)}>
            <h3>Transfer</h3>
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
            <div>
                <label>
                    <span>Destination address:</span>
                    <input
                        aria-invalid={errors.to ? 'true' : 'false'}
                        ref={register({
                            validate: (value) => validateAddress(value) === ValidationResult.VALID,
                        })}
                        name="to"
                        placeholder="tz1xxx1234"
                        type="text"
                    />
                    {errors.to && (
                        <p className="g-ErrorMessage" role="alert">
                            Please enter a valid address
                        </p>
                    )}
                </label>
            </div>
            <button>Submit</button>
        </form>
    );
};

export default TransferForm;
