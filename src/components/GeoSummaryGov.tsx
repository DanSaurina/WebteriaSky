import React, {FC, useEffect, useState} from "react";
//import { WeatherEntryGov } from "./WeatherEntryGov";
//import {Weather, WeatherLocation } from "../model/WeatherGov";
import { readGovapi  } from "../services/WeatherService";
// import './WeatherSummary.scss';
// import { parseJsonText } from "typescript";
 import './App.css';

interface GeoSummaryGovProps {
  value: string;
  daylink: string;
  hourlink: string;

}


export const GeoSummaryGov: FC<GeoSummaryGovProps> = ({value, daylink, hourlink}) => {
 // const [weather, setWeather] = useState<Weather | null>(null);
 // const [forecast, setForecast] = useState<any | null>(null);
  const [govday, setGovDay] = useState("");
  const [govhour, setGovHour] = useState("");

  const [forecastgovday, setForecastgovday] = useState([]);

  const [forecastgovhour, setForecastgovhour] = useState([]);
 //const [forecastgovday, setForecastgovday] = useState([]);
  // const [forecastgovday, setForecastgovday] = useState();

  const [lastvalue, setLastvalue] = useState("");

  let orgstr = "";

  let getgovdays = async (term: string) => {

    setForecastgovhour([]);
  
      const govforecast = await readGovapi(term);

      if ( govforecast)  {
  //    console.log("govforcast " + JSON.stringify(govforecast.properties.periods));
      
      const strobj = JSON.stringify(govforecast.properties.periods);
      const obj = JSON.parse(strobj);
    //  console.log("obj[0].temperature " + obj[0].temperature)

      setForecastgovday(  obj );
  
      } else {
        setForecastgovday(  [] );
      }
  };

  let getgovhours = async (term: string) => {
  
    setForecastgovday([]);

    const govforecast = await readGovapi(term);

    if ( govforecast)  {
   
   // console.log("govforcast " + JSON.stringify(govforecast.properties.periods));
    const strobj = JSON.stringify(govforecast.properties.periods);
    const obj = JSON.parse(strobj);
  //  console.log("obj[0].temperature " + obj[0].temperature)

    setForecastgovhour(  obj );

    //     console.log(" getgovhours 1 " + govforecast.properties.periods[0].temperature);
    //        if ( forecastgovhour ) {
     //        console.log(" forecastgovhour 1 " + JSON.stringify(forecastgovhour));
     //       } 

   } else {
    setForecastgovhour( [] );
   }
  
};


  useEffect(() => {
    (async function () {
      setGovDay(daylink);
      setGovHour(hourlink);
     
  //    alert("In GeoSummaryGov ")
       setForecastgovday([]);
       setForecastgovhour([]);
    })()
  }, [daylink, hourlink, value]);

  if (!daylink || !hourlink ) return null;
  if ( lastvalue === value)  {
   // setForecastgovday([]);
   // setForecastgovhour([]);
  // setLastvalue(value);
   alert("Press Peset Button to load new Forecast !!!")
    return null;
  }

  return (
    <div>
      
      <hr/>
      <h2>{value}</h2>
      
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
          index < 14  && (
            <li key={timePoint["number"]} >
            <table >
              <tbody>
              <tr>
                <td>
                {timePoint["name"]} 
                </td>
                </tr>
                <tr>
                  <td>
              <img src={timePoint["icon"]} alt="Weather" width="60" height="60"></img>        
              Temperature(F): {timePoint["temperature"]} 
              </td></tr>
              <tr><td>
              Wind: {timePoint["windSpeed"]} --- {timePoint["windDirection"]}             
              </td>
              </tr>
              <tr>
              <td>
              Forecast:  {timePoint["shortForecast"]} 
              </td> 
              </tr>
              </tbody>
              </table>
              <br />
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
          index < 24 && (
            <li key={timePoint["number"]}>
              <table>
               <tbody>  
                <tr><td>    
              <img src={timePoint["icon"]} alt="Weather" width="60" height="60"></img>
            
              <div style={{ display: "none" }}>
              {   orgstr =  timePoint["startTime"] }
              </div>
              Hour: { orgstr.substring(11,17) }  
              </td>   
              </tr>
              <tr>
               <td> 
              Temperature(F): {timePoint["temperature"]}
              <p>
              Wind: {timePoint["windSpeed"]} --- {timePoint["windDirection"]}
              </p>
              </td>
              </tr> 
              <tr><td>
              <p>
              Forecast:  {timePoint["shortForecast"]} 
              </p>
              </td></tr>
              </tbody>
              </table>
              <br />
            </li>
          )  ) }
        </ol>
      </div>


    </div>
  );
};
