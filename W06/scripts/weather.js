//https://api.weather.gov/points/34.798975,-82.215619
//.properties.forcastOffice
//.observationStations
//https://brightsky.dev/docs/#get-/weather

function buildUSWeatherServiceURL(lattitude, longitude) {
    //return "https://api.weather.gov/points/"+lattitude.toString()+","+longitude.toString();
    return "http://api.weatherapi.com/v1/current.json?key=7da1ffc79fbe42ac9d2204756232405&q="+lattitude.toString()+","+longitude.toString()+"&aqi=no";
}

/*function buildDEWeatherServiceURL(lattitude, longitude, date) {
    //return "https://api.brightsky.dev/weather?date="+date.toString()+"&lat="+lattitude.toString()+"&lon="+longitude.toString();
    return "http://api.weatherapi.com/v1/current.json?key=7da1ffc79fbe42ac9d2204756232405&q="+lattitude.toString()+","+longitude.toString()+"&aqi=no";
}*/

//function parseForcastURL(response) {
//    return response.properties.forcastOffice;
//}

async function requestWeatherService(weather, location, callBackFunction) {
    let url;
    //let obj;
    let isUS = location.isUS();
    //if(isUS) {
        url = weather.getUSWeatherServiceURL();
        /*
        obj = {
            headers: {
                'User-Agent': "tracy.mann!@retailbusinessservices.com"
            }
        };*/
    //} else if(location.isDE()) {
    //    url = weather.getDEWeatherServiceURL();
    //} else {
    //    url="";
    //}
    if(url!="") {
        //const response = await fetch(url, obj);
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            callBackFunction(location, isUS, data);
        } else {
            weather.setFailWeatherResponse(location, response);
        }
    } else {
        weather.setUnsupportedCountry(location, url);
    }
}

/*
async function requestForecast(weather, url, callBackFunction) {
    if(url!="") {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            callBackFunction(data);
        } else {
            weather.setFailWeatherResponse(location, response);
        }
    } else {
        weather.setFailWeatherResponse(location, url);
    }
}*/

export class Weather {
    updateWeather(location, isUS, data) {
        //if(isUS) {
            this.temp;
            this.windSpeed;
            this.windDirection;
            this.humidity;
            this.condition;
        /*} else {
            this.temp;
            this.windSpeed;
            this.windDirection;
            this.humidity;
            this.condition;
        }*/
        location.updateWeather({
            temp : this.temp,
            windSpeed : this.windSpeed,
            windDirection : this.windDirection,
            humidity : this.humidity,
            condition : this.condition,
            weatherFail:this.weatherFail,
            unsupportedCountry:this.unsupportedCountry
        });
    }
    async getForcastURL(response) {
        while(!this.weatherServiceRecieved) {
            await new Promise(r => setTimeout(r, 1000));
        }
        return parseForcastURL(response);
    }
    recieveWeatherService(location, isUS, data) {
        //if(isUS) {
        //    this.weatherServiceRecieved = true;
        //    requestForecast(this, this.getForcastURL(data), this.recieveForecast);
        //} else {
            this.weatherForecastRecieved = true;
            this.weatherServiceRecieved = true;
            this.updateWeather(location, isUS, data);
        //}
    }
    recieveForecast(data) {
        this.weatherServiceRecieved = true;
        this.weatherForecastRecieved = true;
        this.updateWeather(location, true, data);
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
        requestWeatherService(this, this.location, this.recieveWeatherService);
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
    async getUSWeatherServiceURL() {
        return buildUSWeatherServiceURL(this.lattitude, this.longitude);
    }
    async getDEWeatherServiceURL() {
        let fullDate = Date.now();
        let dte = new Date(fullDate);
        let day = dte.getDate().toString();
        if(day.length==1) {
            day="0"+day;
        }
        let month = (dte.getMonth()+1).toString();
        if(month.length==1) {
            month="0"+month;
        }
        let year = dte.getFullYear().toString();
        let date = year+"-"+month+"-"+day;
        return buildDEWeatherServiceURL(this.lattitude, this.longitude, date);
    }
}