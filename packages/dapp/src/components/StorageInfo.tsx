import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ContractStorageState } from '../store/contract-storage/types';
import { UIState } from '../store/ui/types';
import { ReactComponent as Spinner } from '../svg/noun_spinner_639850.svg';

interface Counter {
    label: string;
    count: number;
}

const StorageInfo: React.FC = () => {
    const storage: ContractStorageState = useSelector((state: RootState) => state.contractStorage);
    const ui: UIState = useSelector((state: RootState) => state.ui);

    const counters: Counter[] = [
        { label: 'Reward Per Share', count: storage.rewardPerShare },
        { label: 'Total Staked', count: storage.totalStaked },
        { label: 'Total Supply', count: storage.totalSupply },
    ];

    return (
        <div className="c-StorageInfo">
            {counters.map((c: Counter) => (
                <div key={uuidv4()}>
                    <div>
                        <span>{c.label}</span>
                        <span>
                            {ui.contractStorageLoading ? <Spinner className="spinner" /> : c.count}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StorageInfo;
