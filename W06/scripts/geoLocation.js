import {Weather} from "./weather.js"

const bingMapsKey = "An_k5E8h_34_Q8LkaUJHw0y5qeDVX1eDPYuKHTeFdcAo77kqbniJ8Znal3DyRIw2";  // bing maps key  - Tracy.Mann1@retailbusinessservices.com - CSE121B-A2-FinalProject - 

function recieveLocation(location, data) {
    let results = data;
    location.updateGEO(results.resourceSets[0].resources[0].geocodePoints[0].coordinates[0], results.resourceSets[0].resources[0].geocodePoints[0].coordinates[1]);
}

async function requestLocation(location, url, callBackFunction) {
    const response = await fetch(url);
    if(response.ok) {
        const data = await response.json();
        callBackFunction(location, data);
    } else {
        location.setFailGEOResponse(response);
    }
}

export class Location {
    getAddress(full=false) {
        if(this.street=="") {
            if(this.country=="United States"&&full==false) {
                return `${this.city} ${this.state} ${this.zipCode}`;
            } else {
                return `${this.city} ${this.state} ${this.zipCode}, ${this.country}`;
            }
        } else {
            if(this.country=="United States"&&full==false) {
                return `${this.street}, ${this.city} ${this.state} ${this.zipCode}`;
            } else {
                return `${this.street}, ${this.city} ${this.state} ${this.zipCode}, ${this.country}`;
            }
        }
    }
    getBingMapsURL() {
        return "http://dev.virtualearth.net/REST/v1/Locations/"+this.getAddress(true)+"?o=json&key="+bingMapsKey
    }
    constructor(city, state, country, zipCode, street="") {
        this.maxResults=1;
        this.city=city;
        this.state=state;
        this.country=country;
        this.street=street;
        this.zipCode=zipCode;
        this.formattedAddress = this.getAddress();
        this.lattitude = 0;
        this.longitude = 0;
        this.geoReturned=false;
        this.weather;
        this.weatherResponse;
        this.weatherReturned=false;
        this.weatherRequested=false;
        requestLocation(this, this.getBingMapsURL(), recieveLocation);
    }
    updateGEO(lattitude, longitude) {
        this.lattitude = lattitude;
        this.longitude = longitude;
        this.geoReturned=true;
        this.weather = new Weather(this, this.lattitude, this.longitude);
        this.weatherRequested=true;
    }
    async requestGEO(document, ids, callBackFunction) {
        while(!this.geoReturned) {
            await new Promise(r => setTimeout(r, 1000));
        }
        callBackFunction(document, ids, {
            formattedAddress : this.formattedAddress,
            lattitude : this.lattitude,
            longitude : this.longitude
        });
    }
    async requestWeather(document, ids, callBackFunction) {
        while(!this.weatherReturned) {
            await new Promise(r => setTimeout(r, 1000));
        }
        callBackFunction(document, ids, {
            weather : this.weather
        });
    }
    setFailGEOResponse(response) {
        this.geoResponse = response;
        this.lattitudeLongitude = "geo service not availavble";
        this.geoReturned=true;
    }
    isUS() {
        return this.country=="United States";
    }
    isDE() {
        return this.country=="Germany";
    }
    updateWeather(weatherObj) {
        /*{
            temp : this.temp,
            windSpeed : this.windSpeed,
            windDirection : this.windDirection,
            humidity : this.humidity,
            condition : this.condition,
            weatherFail:this.weatherFail,
            unsupportedCountry:this.unsupportedCountry
        }*/
        this.weatherFail = false;
        this.weather = weatherObj;
        this.weatherReturned = true;
    }
    setFailWeatherResponse(response) {
        this.weatherFail = true;
        this.weatherResponse = response;
        this.weatherReturned = true;
    }
}

/**
 * 
const testBingsMapUSURL = `http://dev.virtualearth.net/REST/v1/Locations?countryRegion=US&adminDistrict=${usTestAdminDist}&locality=${usTestLocality}&maxResults=${usMaxResult}&key=${bingMapsKey}`;
const testBingsMapDEURL = `http://dev.virtualearth.net/REST/v1/Locations?countryRegion=DE&adminDistrict=${deTestAdminDist}&locality=${deTestLocality}&maxResults=${usMaxResult}&key=${bingMapsKey}`;
const testBingsMapPEURL = `http://dev.virtualearth.net/REST/v1/Locations?countryRegion=PE&adminDistrict=${peTestAdminDist}&locality=${peTestLocality}&maxResults=${usMaxResult}&key=${bingMapsKey}`;

getLocation(testBingsMapUSURL, catchLocation);
//getLocation(testBingsMapDEURL, catchLocation);
//getLocation(testBingsMapPEURL, catchLocation);




let usTestAdminDist = "SC"; // optional // adminDistrict
let usTestLocality = "Simpsonville"; //optional // locality
const usTestpostalCode = 29681; // optional
const usTestAddressLine = "309 Karsten Creek Drive"; //optional  // addressLine
const usTestCountryRegion = "US";  // optional // Germany = DE
const usIncludeNeighborhood = 0; // optional // includeNeighborhood
//const usInclude = "";  // optional
const usMaxResult = 10;  // default 5, range 1-20  // maxResults
const bingmapsGermanyURL = "http://dev.virtualearth.net/REST/v1/Locations/DE/{postalCode}/{locality}/{addressLine}?includeNeighborhood={includeNeighborhood}&include={includeValue}&maxResults={maxResults}&key={BingMapsKey}";
const bingmapsUSAURL = "http://dev.virtualearth.net/REST/v1/Locations/US/{adminDistrict}/{locality}/{addressLine}?includeNeighborhood={includeNeighborhood}&include={includeValue}&maxResults={maxResults}&key={BingMapsKey}";
let results = null;

const deTestAdminDist = "Bayern"; // optional // adminDistrict
const deTestLocality = "Augsburg"; //optional // locality

const peTestAdminDist = "Lima"; // optional // adminDistrict
const peTestLocality = "Callao"; //optional // locality

usTestAdminDist = "TX"; // optional // adminDistrict
usTestLocality = "Goodfellow AFB"; //optional // locality

usTestAdminDist = "KY"; // optional // adminDistrict
usTestLocality = "Fort Knox"; //optional // locality

 */
