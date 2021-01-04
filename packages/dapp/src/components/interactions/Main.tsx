import { useDispatch, useSelector } from 'react-redux';
import TransferForm from './TransferForm';
import MintForm from './MintForm';
import StakingForm from './StakingForm';
import TokenBalance from './TokenBalance';
import Balance from './Balance';
import { ReactComponent as LoginPicto } from '../../svg/noun_log in_1920855.svg';
import { ReactComponent as LogoutPicto } from '../../svg/noun_Log Out_1920823.svg';
import { WalletAccountState, walletConnect, walletDisconnect } from '../../store/walletAccount';
import { RootState } from '../../store';

const Main: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const walletAccount: WalletAccountState = useSelector(
        (state: RootState) => state.walletAccount,
    );
    const dispatch = useDispatch();
    const connect = () => {
        dispatch(walletConnect());
    };
    const disconnect = () => dispatch(walletDisconnect());

    return (
        <div className="i-Interactions">
            {!walletAccount.pkh ? (
                <div className="i-Account_not-connected">
                    <div>wallet not connected</div>
                    <button onClick={connect} aria-label="connect wallet">
                        <LoginPicto />
                    </button>
                </div>
            ) : (
                <>
                    <div className="i-Account_connected">
                        <div>
                            {walletAccount.pkh}
                            <br />
                            <Balance pkh={walletAccount.pkh} />
                            <br />
                            <TokenBalance />
                        </div>
                        <button onClick={disconnect} aria-label="disconnect wallet">
                            <LogoutPicto />
                        </button>
                    </div>

                    <div className="i-Forms">
                        <div>
                            <div>
                                <TransferForm contractAddress={contractAddress} />
                            </div>
                            <div>
                                <MintForm contractAddress={contractAddress} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <StakingForm contractAddress={contractAddress} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Main;
