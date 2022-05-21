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
      //  alert("Click Preset to load new Forecast for " + value);
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
            case "Washington DC":
              lon = -77.036;
              lat = 38.895;
              setPrelon(lon);
              setPrelat(lat);
              break;
              case "East Stroudsburg":
                lon = -75.181;
                lat = 40.999;
                setPrelon(lon);
                setPrelat(lat);
              break
                case "Wellsboro":
                  lon = -77.300;
                  lat = 41.748;
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

  

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setValue(value);
    setGovDay("");
  //  setGovHour("");
    setCurrentLocation(null);
    setLocations([]);
    
    
  
  };


  let addLocation = async (term: string) => {

    setGovDay("");
  //  setGovHour("");

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
     //   console.log("In use effect govlinks " + JSON.stringify(govLinks));
        const jsonlink = JSON.stringify(govLinks);
        const obj = JSON.parse(jsonlink);
     //   console.log("Gov Day forecast link " +  obj.properties.forecast);
        setGovDay(obj.properties.forecast);
    //    console.log("Gov Hour forecast link " +  obj.properties.forecastHourly);
        setGovHour(obj.properties.forecastHourly);
        
    //    return <div>
     //   <GeoSummaryGov value={value} daylink={govday} hourlink={govhour}></GeoSummaryGov>
     //   </div>;
  };

    const clearData = () => {

      setValue("");
      setGovDay("");
    //  setGovHour("");
      setCurrentLocation(null);
      setLocations([]);

    }


  return (
    <div className="container">
      <h1>Webteria Weather </h1>

    { /*
      <LocationSearch onSearch={addLocation}/>
    */
    }  
      <label>
          <select className="ml-1 mr-1" value={value} onChange={selectChange}>
            <option value="TBD">Select Preset Location</option>
            <option value="Honey Brook">Honey Brook</option>
            <option value="Philadelphia">Philadelphia</option>
            <option value="Cape May">Cape May</option>
            <option value="Langhorne">Langhorne</option>
            <option value="New York">New York</option>
            <option value="Washington DC">Washington DC</option>
            <option value="East Stroudsburg">East Stroudsburg</option>
            <option value="Wellsboro">Wellsboro</option>
          </select>
          {
        //  Geolocation: Lon: { prelon } *** Lat: { prelat }   
        }   
        Then 
        <button className="btn btn-primary"
              onClick={usePreset} > Use Preset
        </button>
      
        </label>
        <br ></br>
        <button className="btn btn-primary"
              onClick={clearData} > Clear Screen
        </button>
      

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
