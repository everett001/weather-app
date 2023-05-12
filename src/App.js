import classes from './App.module.css';
import Search from './components/Search';
import WeatherDetails from './components/WeatherDetails';

function App() {
  return (
    <div className={classes.app}>
      <div className={classes.container}>
        <Search />
        <WeatherDetails />
      </div>
    </div>
  );
}

export default App;
