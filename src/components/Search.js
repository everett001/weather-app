import { useState } from 'react';
import classes from './Search.module.css';
import { SearchOutlined } from '@mui/icons-material';
import { Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { searchActions } from '../store/search';

const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
};

const Search = () => {
    const [country, setCountry] = useState('');
    const [notFound, setNotFound] = useState(false);

    const dispatch = useDispatch();

    const countryChangeHandler = (event) => {
        setCountry(event.target.value);
        if (notFound) {
            setNotFound(false);
        }
    }

    const search = async () => {
        // replace 'process.env.REACT_APP_API_KEY' with your api key or add your api key into a .env file
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.REACT_APP_API_KEY}&units=Metric`);
        const data = await res.json();

        if (data.cod === 200) {
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
            setNotFound(false);
            setCountry('');
        } else {
            setNotFound(true);
        }
    }

    return (
        <>
            <div className={classes.search}>
                <input className={classes.input} type="text" name="country" placeholder='Country' value={country} onChange={countryChangeHandler} />
                <button className={classes.btn} onClick={search}><SearchOutlined /></button>
            </div>
            {notFound && <Alert severity="error" style={{ backgroundColor: 'rgb(253 237 237 / 60%)', marginTop: '10px' }}>Not found</Alert>}
        </>
    )
}

export default Search