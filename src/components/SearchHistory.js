import { useSelector } from 'react-redux';
import History from './History';
import classes from './SearchHistory.module.css';

const SearchHistory = () => {
    const mode = useSelector(state => state.search.mode);
    return (
        <div className={`${classes.searchHistory} ${mode === 'dark' ? classes.searchHistoryDark : ''}`}>
            <p className={`${classes.fontOne} ${mode === 'dark' ? classes.fontWhite : ''}`}>Search History</p>
            <History />
        </div>
    )
}

export default SearchHistory