import { useState } from 'react';
import classes from './Search.module.css';
import { DarkMode, LightMode, SearchOutlined } from '@mui/icons-material';
import { Alert, IconButton } from '@mui/material';
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

const Search = () => {
    const mode = useSelector(state => state.search.mode);
    const [country, setCountry] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [msg, setMsg] = useState('');

    const dispatch = useDispatch();

    const countryChangeHandler = (event) => {
        setCountry(event.target.value);
        if (showAlert) {
            setShowAlert(false);
        }
    }

    const search = async () => {
        // replace 'process.env.REACT_APP_API_KEY' with your api key or add your api key into a .env file
        if (country !== '') {
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
                setShowAlert(false);
                setCountry('');
            } else {
                setShowAlert(true);
                setMsg('Not found');
            }
        } else {
            setShowAlert(true);
            setMsg('Please enter a city or country name');
        }
    }

    return (
        <>
            <div className={classes.search}>
                <input className={`${classes.input} ${mode === 'light' ? classes.lightinput : classes.darkInput}`} type="text" name="country" placeholder='Country' value={country} onChange={countryChangeHandler} />
                <button className={`${classes.btn} ${mode === 'light' ? classes.lightBtn : classes.darkBtn}`} onClick={search}><SearchOutlined /></button>
                <IconButton style={{ padding: '12px' }} onClick={() => dispatch(searchActions.setMode())}>
                    {mode === "dark" ? (
                        <DarkMode style={{ color: '#28124D' }} />
                    ) : (
                        <LightMode style={{ color: 'orange' }} />
                    )}
                </IconButton>
            </div>
            {showAlert && <Alert severity="error" style={{ backgroundColor: 'rgb(253 237 237 / 60%)', marginTop: '10px' }}>{msg}</Alert>}
        </>
    )
}

export default Search