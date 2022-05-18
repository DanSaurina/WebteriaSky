import React, {FC} from "react";
import {Weather} from "../model/WeatherGov";
import {getIconUrl} from "../services/WeatherService";
import {convertUnixTimeToDate} from "../services/TimeUtilities";

interface WeatherEntryGovProps {
  weather: Weather;
}

export const WeatherEntryGov: FC<WeatherEntryGovProps> = ({weather}) =>
  <div>
    <div>{convertUnixTimeToDate(weather.dt).toLocaleTimeString()}</div>
    <div>
      <strong>{(weather.main.temp*1.8 + 32).toFixed()}°F</strong>
      <div>({(weather.main.temp_min*1.8 + 32).toFixed()}°F / {(weather.main.temp_max*1.8 + 32).toFixed()}°F)</div>
    </div>
    <div>Humidity: {weather.main.humidity}%</div>
    {weather.weather.map(condition =>
      <div key={condition.id}>
        <img src={getIconUrl(condition.icon)} alt={condition.main}/> {condition.main} {condition.description}
      </div>)
    }
  </div>;
