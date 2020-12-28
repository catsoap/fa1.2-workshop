import useBeacon from '../../hooks/useBeacon';
import TransferForm from './TransferForm';
import MintForm from './MintForm';
import StakingForm from './StakingForm';
import TokenBalance from './TokenBalance';
import Balance from './Balance';
import { ReactComponent as LoginPicto } from '../../svg/noun_log in_1920855.svg';
import { ReactComponent as LogoutPicto } from '../../svg/noun_Log Out_1920823.svg';

const Main: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const { connect, disconnect, pkh, Tezos } = useBeacon();

    return (
        <div className="i-Interactions">
            {!pkh ? (
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
                            {pkh}
                            <br />
                            <Balance pkh={pkh} />
                            <br />
                            <TokenBalance
                                contractAddress={contractAddress}
                                pkh={pkh}
                                tezos={Tezos}
                            />
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
