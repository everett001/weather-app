import { useMediaQuery } from '@mui/material';
import classes from './History.module.css';
import { SearchOutlined, DeleteOutline } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { searchActions } from '../store/search';

const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
};

const History = () => {
    const isMobile = useMediaQuery("(max-width:769px)");
    const mode = useSelector(state => state.search.mode);
    const searchhistory = useSelector(state => state.search.searchHistory);
    const dispatch = useDispatch();

    const searchCountry = async (country) => {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.REACT_APP_API_KEY}&units=Metric`);
        const data = await res.json();
        let search = {
            search: {
                id: new Date().getTime(),
                temp: Math.round(data.main.temp),
                hi: Math.round(data.main.temp_max),
                low: Math.round(data.main.temp_min),
                country: data.name + ', ' + data.sys.country,
                createdAt: new Date().toLocaleString('en-US', options),
                humidity: data.main.humidity,
                weather: data.weather[0].main
            }
        }
        dispatch(searchActions.setSearch(search));
        dispatch(searchActions.addSearch(search));
    }

    return (
        <>
            {searchhistory.length > 0 && searchhistory.map(search => {
                return <div className={`${classes.history} ${mode === 'dark' ? classes.historyDark : ''}`} key={search.id}>
                    <div className={`${classes.info} ${mode === 'dark' ? classes.infoDark : ''}`}>
                        <p>{search.country}</p>
                        <p className={`${isMobile ? classes.datetime : ''} ${mode === 'dark' ? classes.datetimeDark : ''}`}>{search.createdAt}</p>
                    </div>
                    <div className={classes.btns}>
                        <button className={`${classes.btn} ${mode === 'dark' ? classes.btnDark : classes.btnLight}`} onClick={() => searchCountry(search.country)}>
                            <SearchOutlined />
                        </button>
                        <button className={`${classes.btn} ${mode === 'dark' ? classes.btnDark : classes.btnLight}`} onClick={() => { dispatch(searchActions.deleteSearch(search.id)) }}>
                            <DeleteOutline />
                        </button>
                    </div>
                </div>
            })}
            {searchhistory.length === 0 && <div className={classes.history}>
                <p>No Search History</p>
            </div>}
        </>

    )
}

export default History