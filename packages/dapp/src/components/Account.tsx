import useBeacon from '../hooks/useBeacon';
import classNames from 'classnames';
import TokenBalance from './TokenBalance';
import Balance from './Balance';

const Account: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
    const { connect, disconnect, pkh } = useBeacon();

    return (
        <div className={classNames('g-Account', { connected: pkh })}>
            {!pkh ? (
                <>
                    <div>wallet not connected</div>
                    <button onClick={connect}>connect</button>
                </>
            ) : (
                <>
                    <div>
                        {pkh}
                        <br />
                        <Balance pkh={pkh} />
                        <br />
                        <TokenBalance contractAddress={contractAddress} />
                    </div>
                    <button onClick={disconnect}>disconnect</button>
                </>
            )}
        </div>
    );
};

export default Account;
