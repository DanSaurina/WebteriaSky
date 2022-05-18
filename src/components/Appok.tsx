import React, {FC, useState, useEffect} from 'react';
// import './App.css';
import {LocationSearch} from "./LocationSearch";
import {LocationTable} from "./LocationTable";
import {WeatherLocation} from "../model/Weather";
import {searchLocation, readForecast } from "../services/WeatherService";
import {ErrorAlert, WarningAlert} from "./Alerts";
// import {WeatherSummary} from "./WeatherSummary";
import {WeatherSummaryGov} from "./WeatherSummaryGov";
import { GeoSummaryGov } from './GeoSummaryGov';




const App: FC = () => {
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [currentLocation, setCurrentLocation] = useState<WeatherLocation | null>(null);

  const [prelon, setPrelon] = useState(0);
  const [prelat, setPrelat] = useState(0);

  const [govday, setGovDay] = useState("");
  const [govhour, setGovHour] = useState("");


  const resetAlerts = () => {
    setError('');
    setWarning('');
  }

  const [value, setValue] = useState("");
  useEffect(() => {
    (async function () {
      if (value) {
       // alert("Preset value:" + value);
        // Set Preset geo for location
        let lon = 0;
        let lat = 0;
        switch (value) {
          case "Honey Brook":
            lon = -75.9113;      
            lat = 40.0943;
            setPrelon(lon);
            setPrelat(lat);
            break;
          case "Langhorne":
            lon = -74.9227;
            lat = 40.1745;
            setPrelon(lon);
            setPrelat(lat);
            break;
            case "Philadelphia":
            lon = -75.1638;
            lat = 39.9523;
            setPrelon(lon);
            setPrelat(lat);
            break;
            case "Cape May":
            lon = -74.906;
            lat = 38.935;
            setPrelon(lon);
            setPrelat(lat);
              break;
            case "New York":
            lon = -74.006;
            lat = 40.714;
            setPrelon(lon);
            setPrelat(lat);
            break;
          default:
            lon = 0;
            lat = 0;
            setPrelon(lon);
            setPrelat(lat);
            break;
        }
        // endof preset geo
        // if lat lon = 0 
        // call readforcast, get govday hour links
        // set up buttons for day or hour etc.

        
      }

    })()
  }, [value,prelat,prelon]);

  let addLocation = async (term: string) => {
    resetAlerts();
    const location = await searchLocation(term);

    if (!location) {
      setError(`No location found called '${term}'`);
    } else if (locations.find(item => item.id === location.id)) {
      setWarning(`Location '${term}' is already in the list.`);
    } else {
      setLocations([location, ...locations]);
    }
  };

  const usePreset = async () => {
    const govLinks = await readForecast(1, prelat,prelon);
        console.log("In use effect govlinks " + JSON.stringify(govLinks));
        const jsonlink = JSON.stringify(govLinks);
        const obj = JSON.parse(jsonlink);
        console.log("Gov Day forecast link " +  obj.properties.forecast);
        setGovDay(obj.properties.forecast);
        console.log("Gov Hour forecast link " +  obj.properties.forecastHourly);
        setGovHour(obj.properties.forecastHourly);
        
    //    return <div>
     //   <GeoSummaryGov value={value} daylink={govday} hourlink={govhour}></GeoSummaryGov>
     //   </div>;
  };

  return (
    <div className="container">
      <h1>Weather App</h1>

      <LocationSearch onSearch={addLocation}/>
      
      <label>
          Or Use  Preset
          <select value={value} onChange={e => setValue(e.target.value)}>
            <option value="TBD">Select Preset Location</option>
            <option value="Honey Brook">Honey Brook</option>
            <option value="Philadelphia">Philadelphia</option>
            <option value="Cape May">Cape May</option>
            <option value="Langhorne">Langhorne</option>
            <option value="New York">New York</option>
          </select>
          {
        //  Geolocation: Lon: { prelon } *** Lat: { prelat }   
        }   
        
        <button className="btn btn-primary"
              onClick={usePreset} > Preset
      </button>
      
        </label>
      

      <ErrorAlert message={error}/>
      <WarningAlert message={warning}/>
      <LocationTable locations={locations}
                     current={currentLocation}
                     onSelect={location => setCurrentLocation(location)}/>
      { //
     // <WeatherSummary location={currentLocation}/>
    }
      <WeatherSummaryGov location={currentLocation}/>
      {
      <GeoSummaryGov value={value} daylink={govday} hourlink={govhour}/>
      }
    </div>
  );
};

export default App;
