//weather api key:  7da1ffc79fbe42ac9d2204756232405
function buildWeatherServiceURL(lattitude, longitude) {
    return "http://api.weatherapi.com/v1/current.json?key=7da1ffc79fbe42ac9d2204756232405&q="+lattitude.toString()+","+longitude.toString()+"&aqi=no";
}

function recieveWeatherService(weather, location, data) {
    weather.weatherForecastRecieved = true;
    weather.weatherServiceRecieved = true;
    weather.updateWeather(location, data);
}

async function requestWeatherService(weather, location, callBackFunction) {
    let url;
    url = weather.getWeatherServiceURL();
    if(url!="") {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            callBackFunction(weather, location, data);
        } else {
            weather.setFailWeatherResponse(location, response);
        }
    } else {
        weather.setUnsupportedCountry(location, url);
    }
}

export class Weather {
    updateWeather(location, data) {
        this.temp = data.current.temp_f;
        this.windSpeed = data.current.wind_mph;
        this.windDirection = data.current.wind_dir;
        this.humidity = data.current.humidity;
        this.condition = data.current.condition.text;
        this.conditionIcon = data.current.condition.icon;
        location.updateWeather({
            temp : this.temp,
            windSpeed : this.windSpeed,
            windDirection : this.windDirection,
            humidity : this.humidity,
            condition : this.condition,
            weatherFail:this.weatherFail,
            unsupportedCountry:this.unsupportedCountry,
            conditionIcon:this.conditionIcon
        });
    }
    async getForcastURL(response) {
        while(!this.weatherServiceRecieved) {
            await new Promise(r => setTimeout(r, 1000));
        }
        return parseForcastURL(response);
    }
    recieveForecast(data) {
        this.weatherServiceRecieved = true;
        this.weatherForecastRecieved = true;
        this.updateWeather(location, data);
        this.forecast = data;
    }
    constructor(location, lattitude, longitude) {
        this.geoRecieved = false;
        this.weatherServiceRecieved = false;
        this.weatherForecastRecieved = false;
        this.weatherFail = false;
        this.unsupportedCountry = false;
        this.location = location;
        this.lattitude = lattitude;
        this.longitude = longitude;
        this.isUS = location.isUS();
        this.response;
        this.forecast;
        this.temp;
        this.windSpeed;
        this.windDirection;
        this.humidity;
        this.condition;
        this.conditionIcon;
        requestWeatherService(this, this.location, recieveWeatherService);
    }
    setFailWeatherResponse(location, response) {
        this.weatherServiceRecieved = true;
        this.weatherForecastRecieved = true;
        this.weatherFail = true;
        this.response = response;
        location.setFailWeatherResponse(response);
    }
    setUnsupportedCountry(location, url) {
        this.weatherServiceRecieved = true;
        this.weatherForecastRecieved = true;
        this.weatherFail = true;
        this.unsupportedCountry = true;
        location.setFailWeatherResponse(url);
    }
    getWeatherServiceURL() {
        return buildWeatherServiceURL(this.lattitude, this.longitude);
    }
}