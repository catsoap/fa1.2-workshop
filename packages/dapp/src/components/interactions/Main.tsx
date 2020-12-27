import useBeacon from '../../hooks/useBeacon';
import TransferForm from './TransferForm';
import MintForm from './MintForm';
import TokenBalance from './TokenBalance';
import Balance from './Balance';

const Main: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const { connect, disconnect, pkh, Tezos } = useBeacon();

    return (
        <div className="i-Interactions">
            {!pkh ? (
                <div className="i-Account_not-connected">
                    <div>wallet not connected</div>
                    <button onClick={connect}>connect</button>
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
                        <button onClick={disconnect}>disconnect</button>
                    </div>

                    <div className="i-Forms">
                        <div>
                            <h3>Token</h3>
                            <TransferForm contractAddress={contractAddress} />
                            <MintForm contractAddress={contractAddress} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Main;
