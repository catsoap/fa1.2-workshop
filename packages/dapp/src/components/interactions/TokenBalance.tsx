import { useSelector } from 'react-redux';
import { TokenContractState } from '../../store/tokenContract';
import { RootState } from '../../store';

const TokenBalance: React.FC = () => {
    const tokenContract: TokenContractState = useSelector(
        (state: RootState) => state.tokenContract,
    );

    return (
        <>
            {!tokenContract.loading ? (
                <>
                    {`tokens: ${tokenContract.ledger.balance}`}
                    <br />
                    {`staked: ${tokenContract.ledger.staked}`}
                </>
            ) : (
                'loading..'
            )}
        </>
    );
};

export default TokenBalance;
