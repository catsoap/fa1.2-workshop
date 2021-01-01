import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { TokenStorageState } from '../store/token-storage';
import { ReactComponent as Spinner } from '../svg/noun_spinner_639850.svg';

interface Counter {
    label: string;
    count: number;
}

const StorageInfo: React.FC = () => {
    const storage: TokenStorageState = useSelector((state: RootState) => state.tokenStorage);

    const counters: Counter[] = [
        { label: 'Reward Per Share', count: storage.rewardPerShare },
        { label: 'Total Staked', count: storage.totalStaked },
        { label: 'Total Supply', count: storage.totalSupply },
    ];

    return (
        <div className="c-StorageInfo">
            {storage.error !== '' ? (
                <p className="g-ErrorMessage">{storage.error}</p>
            ) : (
                counters.map((c: Counter) => (
                    <div key={uuidv4()}>
                        <div>
                            <span>{c.label}</span>
                            <span>
                                {storage.loading ? <Spinner className="spinner" /> : c.count}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default StorageInfo;
