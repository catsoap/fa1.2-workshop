import { useSelector } from 'react-redux';
import { WalletAccountState } from '../../store/walletAccount';
import { RootState } from '../../store';

const Balance: React.FC<{ pkh: string }> = ({ pkh }) => {
    const walletAccount: WalletAccountState = useSelector(
        (state: RootState) => state.walletAccount,
    );

    return (
        <>
            {!walletAccount.loading && (walletAccount.balance !== undefined || walletAccount.error)
                ? `${walletAccount.balance} ꜩ` ?? walletAccount.error
                : 'loading..'}
        </>
    );
};

export default Balance;
