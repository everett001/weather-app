import classes from './WeatherDetails.module.css';
import sun from '../assets/sun.png';
import cloud from '../assets/cloud.png';
import SearchHistory from './SearchHistory';
import { useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

const WeatherDetails = () => {
    const isMobile = useMediaQuery("(max-width:769px)");
    const weatherInfo = useSelector(state => state.search.currentSearch);

    return (
        <div className={classes.weather}>
            {weatherInfo  && <>
                <img className={classes.img} src={weatherInfo.temp >= '30' ? sun : cloud} alt="Logo" />
                <div className={classes.weather__container}>
                    <div>
                        <p className={classes.fontOne}>Today's Weather</p>
                        <p className={classes.fontTwo}>{weatherInfo.temp + '°'}</p>
                        <p className={classes.fontOne}>H:{weatherInfo.hi + '°'} L:{weatherInfo.low + '°'}</p>
                        <div className={classes.weather__info}>
                            <p className={classes.country}>{weatherInfo.country}</p>
                            <div className={`${classes.sub__container} ${isMobile ? classes.hide : classes.active}`}>
                                <p className={classes.fontThree}>{weatherInfo.createdAt}</p>
                                <p className={classes.fontThree}>Humidity: {weatherInfo.humidity + '%'}</p>
                                <p className={classes.fontThree}>{weatherInfo.weather}</p>
                            </div>
                        </div>
                    </div>
                    <div className={`${classes.sub__container} ${isMobile ? classes.active : classes.hide}`}>
                        <p className={classes.fontThree}>{weatherInfo.createdAt}</p>
                        <p className={classes.fontThree}>Humidity: {weatherInfo.humidity + '%'}</p>
                        <p className={classes.fontThree}>{weatherInfo.weather}</p>
                    </div>
                </div>
            </>}
            <SearchHistory />
        </div>
    )
}

export default WeatherDetails