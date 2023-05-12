import History from './History';
import classes from './SearchHistory.module.css';

const SearchHistory = () => {
    return (
        <div className={classes.searchHistory}>
            <p className={classes.fontOne}>Search History</p>
            <History />
        </div>
    )
}

export default SearchHistory