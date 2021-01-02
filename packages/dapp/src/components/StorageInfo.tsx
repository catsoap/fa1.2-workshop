import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { RootState } from '../store';
import { TokenContractState } from '../store/token-contract';
import { ReactComponent as Spinner } from '../svg/noun_spinner_639850.svg';
import { ReactComponent as PictoLink } from '../svg/noun_External Link_704636.svg';

dayjs.extend(relativeTime);

interface Item {
    label: string;
    value: number | string;
}

const StorageInfo: React.FC = () => {
    const tokenContract: TokenContractState = useSelector(
        (state: RootState) => state.tokenContract,
    );

    const items: Item[] = [
        { label: 'Last Update', value: dayjs(tokenContract.lastUpdateTime).fromNow() },
        { label: 'Reward Per Share', value: tokenContract.rewardPerShare },
        { label: 'Total Staked', value: tokenContract.totalStaked },
        { label: 'Total Supply', value: tokenContract.totalSupply },
    ];

    return (
        <div className="c-StorageInfo">
            <h2>
                <span>{tokenContract.address}</span>
                <a href={`https://better-call.dev/delphinet/${tokenContract.address}`}>
                    <PictoLink />
                </a>
            </h2>
            <div>
                {tokenContract.error !== '' ? (
                    <p className="g-ErrorMessage">{tokenContract.error}</p>
                ) : (
                    items.map((i: Item) => (
                        <div key={uuidv4()}>
                            <div>
                                <span>{i.label}</span>
                                <span>
                                    {tokenContract.loading ? (
                                        <Spinner className="spinner" />
                                    ) : (
                                        i.value
                                    )}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default StorageInfo;
