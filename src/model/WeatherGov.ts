export interface Coordinates {
    lon: number;
    lat: number;
}

export interface WeatherLocation {
    coord: Coordinates;
    id: number;
    name: string;
}

export interface WeatherConditions {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Weather {
    weather: WeatherConditions[];
    main: MainWeatherData;
    dt: number;
}

export interface periods { 
        number: number;
        name: string;
        startTime: string;
        endTime: string;
        isDaytime: boolean;
        temperature: number;
        temperatureUnit: string;
        temperatureTrend: null;
        windSpeed: string;
        windDirection: string;
        icon: string;
        shortForecast: string;
        detailedForecast: string;   
}

export interface GovLink {
    periods: periods[];
    
}
export interface WeatherGov {
    
    properties: GovLink
}
