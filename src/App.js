import classes from './App.module.css';
import Search from './components/Search';
import WeatherDetails from './components/WeatherDetails';
import lightbg from './assets/bg-light.png';
import darkbg from './assets/bg-dark.png';
import { useSelector } from 'react-redux';

function App() {
  const mode = useSelector(state => state.search.mode);

  return (
    <div className={classes.app} style={{ backgroundImage: mode === 'light' ? `url(${lightbg})` : `url(${darkbg})` }}>
      <div className={classes.container}>
        <Search />
        <WeatherDetails />
      </div>
    </div>
  );
}

export default App;
