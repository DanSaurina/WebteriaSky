import React, {FC, useEffect, useState} from "react";
import { WeatherEntryGov } from "./WeatherEntryGov";
import {Weather, WeatherLocation } from "../model/WeatherGov";
import {readForecast, readWeather, readGovapi  } from "../services/WeatherService";

interface WeatherSummaryGovProps {
  location: WeatherLocation | null;

}

export const WeatherSummaryGov: FC<WeatherSummaryGovProps> = ({location}) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Weather[] | null>(null);
  const [govday, setGovDay] = useState("");
  const [govhour, setGovHour] = useState("");

  const [forecastgovday, setForecastgovday] = useState([]);

  const [forecastgovhour, setForecastgovhour] = useState([]);
 //const [forecastgovday, setForecastgovday] = useState([]);
  // const [forecastgovday, setForecastgovday] = useState();

  let getgovdays = async (term: string) => {
  
      const govforecast = await readGovapi(term);
      if ( govforecast != null ) {
   //   console.log("govforcast " + JSON.stringify(govforecast.properties.periods));
      
      const strobj = JSON.stringify(govforecast.properties.periods);
      const obj = JSON.parse(strobj);
  //    console.log("obj[0].temperature " + obj[0].temperature)

      setForecastgovday(  obj );
  
      console.log(" getgovdays 1 " + govforecast.properties.periods[0].temperature);
      if ( forecastgovday ) {
   //   console.log(" forecastgovday 1 " + JSON.stringify(forecastgovday));
    }
    
  }
  };

  let getgovhours = async (term: string) => {
  
    const govforecast = await readGovapi(term);

    if ( govforecast != null ) {
  //  console.log("govforcast " + JSON.stringify(govforecast.properties.periods));
    
    const strobj = JSON.stringify(govforecast.properties.periods);
    const obj = JSON.parse(strobj);
  //  console.log("obj[0].temperature " + obj[0].temperature)

    setForecastgovhour(  obj );

   // console.log(" getgovhours 1 " + govforecast.properties.periods[0].temperature);
    if ( forecastgovhour ) {
   // console.log(" forecastgovhour 1 " + JSON.stringify(forecastgovhour));
  } 
}

};


  useEffect(() => {
    (async function () {
      if (location) {
        const [weather, forecast] = await Promise.all([
          readWeather(location.id),
          readForecast(location.id, location.coord.lat, location.coord.lon),
        ]);
        setWeather(weather);
    //    console.log("weather returns " + JSON.stringify(weather));
        setForecast(forecast);
    //    console.log("Forecast returns " + JSON.stringify(forecast));
        const jsonlink = JSON.stringify(forecast);
        const obj = JSON.parse(jsonlink);
        console.log("Gov Day forecast link " +  obj.properties.forecast);
        setGovDay(obj.properties.forecast);
        console.log("Gov Hour forecast link " +  obj.properties.forecastHourly);
        setGovHour(obj.properties.forecastHourly);
      }
    })()
  }, [location]);

  if (!location || !weather || !forecast) return null;

  return (
    <div>
      <hr/>
      <h2>{location.name}</h2>
      <WeatherEntryGov weather={weather}/>

      <h2>Forecast</h2>
      <button className="btn btn-primary"
              onClick={() =>   getgovdays( govday )} >Daily
      </button>
      <button className="btn btn-primary"
              onClick={() => {       
           //     alert("Hourly: " + govhour );
                getgovhours( govhour );
           //     alert("govforecast " +JSON.stringify(forecastgovhour) );
             //   alert("govforecast 1 temp " + forecastgovhour[0]["temperature"] );
              }} >Hourly
      </button>
      <div>
        <ol >
          {  forecastgovday.map((timePoint, index) =>
          index < 5 && (
            <li key={timePoint["number"]} >
              <p>
              <img src={timePoint["icon"]} alt="Weather" width="60" height="60"></img>
              Day: {timePoint["name"]}
              </p>
              <p>
              Temperature(F): {timePoint["temperature"]}
              <br/>
              Wind: {timePoint["windSpeed"]} --- {timePoint["windDirection"]}           
              <br/>
              Forecast:  {timePoint["shortForecast"]}    
              </p>
            </li>
          )  ) }
        </ol>
      </div>

      <div>
        <ol >
          { /* forecast.map(timePoint =>
            <li key={timePoint.dt}>
              <WeatherEntry weather={timePoint}/>
            </li>
          )  */ }
          {  forecastgovhour.map((timePoint, index) =>
          index < 5 && (
            <li key={timePoint["number"]}>
              <p>
              <img src={timePoint["icon"]} alt="Weather" width="60" height="60"></img>
              </p>
              Hour: {timePoint["number"]}
              <p>
              Temperature(F): {timePoint["temperature"]}
              </p><p>
              Wind: {timePoint["windSpeed"]} --- {timePoint["windDirection"]}
              </p>
              <p>
              Forecast:  {timePoint["shortForecast"]} 
              </p>
            </li>
          )  ) }
        </ol>
      </div>


    </div>
  );
};
