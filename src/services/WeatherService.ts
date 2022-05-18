import {GovLink, Weather, WeatherLocation} from '../model/Weather';
import {WeatherGov} from '../model/WeatherGov';



//const key: string = process.env.REACT_APP_OPEN_WEATHER_API_KEY as string;

 const  key = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

// const  key: string = process.env.REACT_APP_OPEN_WEATHER_API_KEY as string;

// const { REACT_APP_OPEN_WEATHER_API_KEY } = process.env;
 // console.log(process.env);


if (key === undefined) {
  throw new Error('No Open Weather API Key defined - ensure you set a variable called REACT_APP_OPEN_WEATHER_API_KEY')
}

const keyQuery = `appid=${key}`
const server = 'http://api.openweathermap.org/data/2.5';


/*
https://api.weather.gov/points/39.952,-75.168
const serverGov = https://api.weather.gov/points/

lon: number, lat: number
*/
const serverGov = 'https://api.weather.gov/points/';

export async function searchLocation(term: string): Promise<WeatherLocation | undefined> {
  const result = await fetch(`${server}/weather?q=${term}&${keyQuery}`);

  if (result.status === 404) return undefined;
  if (result.status !== 200) throw new Error('Failed to read location data');

  return await result.json();
}

export async function readWeather(locationId: number): Promise<Weather> {
  const current = await fetch(`${server}/weather?id=${locationId}&${keyQuery}&units=metric`);

  if (current.status !== 200) throw new Error('Failed to read location data');

  return await current.json();
}

/*
export async function readForecast(locationId: number): Promise<Weather[]> {
  const forecast = await fetch(`${server}/forecast?id=${locationId}&${keyQuery}&units=metric&cnt=8`);

  if (forecast.status !== 200) throw new Error('Failed to read location data');

  return (await forecast.json()).list;
}
*/
export async function readForecast(locationId: number, lat: number, lon: number): Promise<Weather[]> {
 
  const forecast = await fetch(`${serverGov}/${lat},${lon}`);

 // if (forecast.status !== 200) throw new Error('Failed to read location data');
 if (forecast.status !== 200) return [];
  return (await forecast.json());

 // return [];
}

export async function readGeoLinks(locationId: string, lat: number, lon: number): Promise<GovLink> {
 
  const forecast = await fetch(`${serverGov}/${lat},${lon}`);

 // if (forecast.status !== 200) throw new Error('Failed to read location data');
 
  
  return (await forecast.json());

 // return [];
}

export async function readGovapi( link: string): Promise<WeatherGov | null > {
  /*
 const forecast = await fetch(`${server}/forecast?id=${locationId}&${keyQuery}&units=metric&cnt=8`);

  if (forecast.status !== 200) throw new Error('Failed to read location data');

  return (await forecast.json()).list;
  */
 // console.log("in readGovApi link  " + link );
  const govapi = await fetch(link);
//  console.log(" govapi " + JSON.stringify(govapi));

  // if (govapi.status !== 200) throw new Error('Failed to read location data');

  if (govapi.status !== 200) { 
    alert("Government Data Base did not respone, please try again in a few seconds.");
    return ( null );
  };


  return (await govapi.json());

 // return [];
}





export function getIconUrl(code: string): string {
  return `http://openweathermap.org/img/wn/${code}.png`;
}
