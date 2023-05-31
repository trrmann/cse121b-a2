import {Location} from "./geoLocation.js"
/* Final Project */

/* DATA */

// Step 1: Declare a new variable to hold information about yourself
const self = {};

// Step 2: Inside of the object, add a property named name with a value of your name as a string
self.name = 'Tracy Mann';

// Step 3: Add another property named photo with a value of the image path and name (used in Task 2) as a string
self.photo = 'images/tracy_office.jpg';

// Step 4: Add another property named favoriteFoods with a value of an array of your favorite foods as strings ( hint: [] )
self.favoriteFoods = ["ribs", "steak", "ceveche", "cherry pie", "roast beef"];

// Step 5: Add another property named hobbies with a value of an array of your hobbies as strings
self.hobbies = ["traveling", "camping", "canoeing", "gaming", "programming", "learning"];

// Step 6: Add another property named placesLived with a value of an empty array
self.placesLived = [];

// Step 7: Inside of the empty array above, add a new object with two properties: place and length and values of an empty string
self.placesLived[0] = {place:"", length:""}

// Step 8: For each property, add appropriate values as strings
self.placesLived[0].place = new Location("Hartsville", "NY", "United States", "14843");
self.placesLived[0].length = "1970 - 1976";

// Step 9: Add additional objects with the same properties for each place you've lived
self.placesLived[1] = {place:  new Location("Parshall", "ND", "United States", "58770"), length:"1976 - 1977"}
self.placesLived[2] = {place:  new Location("Foxholm", "ND", "United States", "58718"), length:"1977 - 1977"}
self.placesLived[3] = {place:  new Location("Berthold", "ND", "United States", "58718"), length:"1977 - 1979"}
self.placesLived[4] = {place:  new Location("Minot", "ND", "United States", "58703"), length:"1979 - 1982"}
self.placesLived[5] = {place:  new Location("Minneapolis", "MN", "United States", "55407"), length:"1982 - 1982"}
self.placesLived[6] = {place:  new Location("Anoka", "MN", "United States", "55303"), length:"1982 - 1984"}
self.placesLived[7] = {place:  new Location("Hornell", "NY", "United States", "14843"), length:"1984 - 1988"}
self.placesLived[8] = {place:  new Location("Fort Knox", "KY", "United States", "40122"), length:"1988 - 1988"}
self.placesLived[9] = {place:  new Location("Goodfellow AFB", "TX", "United States", "76905"), length:"1988 - 1989"}
self.placesLived[10] = {place:  new Location("Augsburg", "Bayern", "Germany", "86167"), length:"1989 - 1992"}
self.placesLived[11] = {place:  new Location("Hartsville", "NY", "United States", "14843"), length:"1992 - 1993"}
self.placesLived[12] = {place:  new Location("Hornell", "NY", "United States", "14843"), length:"1993 - 1993"}
self.placesLived[13] = {place:  new Location("Canesteo", "NY", "United States", "14823"), length:"1993 - 1993"}
self.placesLived[14] = {place:  new Location("Hornell", "NY", "United States", "14843"), length:"1993 - 1993"}
self.placesLived[15] = {place:  new Location("Alfred", "NY", "United States", "14803"), length:"1993 - 1994"}
self.placesLived[16] = {place:  new Location("Amherst", "NY", "United States", "14226"), length:"1994 - 1998"}
self.placesLived[17] = {place:  new Location("Lockport", "NY", "United States", "14095"), length:"1998 - 2001"}
self.placesLived[18] = {place:  new Location("Mauldin", "SC", "United States", "29607"), length:"2001 - 2003"}
self.placesLived[19] = {place:  new Location("Moonville", "SC", "United States", "29673"), length:"2003 - 2004"}
self.placesLived[20] = {place:  new Location("Mauldin", "SC", "United States", "29607"), length:"2004 - 2006"}
self.placesLived[21] = {place:  new Location("Simpsonville", "SC", "United States", "29687", "309 Karsten Creek Drive"), length:"2006 - 2023"}

/* OUTPUT */

// Step 1: Assign the value of the name property (of the object declared above) to the HTML <span> element with an ID of name
document.querySelector("#name").innerHTML = self.name;

// Step 2: Assign the value of the photo property as the src attribute of the HTML <img> element with an ID of photo
document.querySelector("#photo").setAttribute("src", self.photo);
document.querySelector("#photo").setAttribute("width", 500);

// Step 3: Assign the value of the name property as the alt attribute of the HTML <img> element with an ID of photo
document.querySelector("#photo").setAttribute("alt", self.name);

// Step 4: For each favorite food in the favoriteFoods property, create an HTML <li> element and place its value in the <li> element
const favoriteFoodArray = self.favoriteFoods.map((food) => {const liElement = document.createElement("li"); liElement.innerText = food;return liElement});

// Step 5: Append the <li> elements created above as children of the HTML <ul> element with an ID of favorite-foods
favoriteFoodArray.map((element) => {document.querySelector("#favorite-foods").appendChild(element)});

// Step 6: Repeat Step 4 for each hobby in the hobbies property
const hobbyArray = self.hobbies.map((hobby) => {const liElement = document.createElement("li"); liElement.innerText = hobby;return liElement});

// Step 7: Repeat Step 5 using the HTML <ul> element with an ID of hobbies
hobbyArray.map((element) => {document.querySelector("#hobbies").appendChild(element)});

function recieveGeo(document, ids, data) {
    document.querySelector(`#${ids.addr}`).innerText = data.formattedAddress;
    document.querySelector(`#${ids.latLong}`).innerText = `geoPos:  ${data.lattitude} / ${data.longitude}`;
    //document.querySelector(`#${ids.weather}`).innerText = "Pending...";
}

function recieveWeather(document, ids, data) {
    if(data.weather.unsupportedCountry) {
        document.querySelector(`#${ids.weather}`).innerText = "Weather for this Country is not supported.";

    } else if(data.weather.weatherFail) {
        document.querySelector(`#${ids.weather}`).innerText = "Weather service not available!";
    } else {
        let icon = document.createElement("img")
        icon.src = data.weather.conditionIcon
        document.querySelector(`#${ids.weather}`).innerText = data.weather.condition +" and " +data.weather.temp +"F, Wind:  "+data.weather.windSpeed+"mph "+data.weather.windDirection;
        document.querySelector(`#${ids.weather}`).appendChild(icon);
    }
}

// Step 8: For each object in the <em>placesLived</em> property:
// - Create an HTML <dt> element and put its place property in the <dt> element
// - Create an HTML <dd> element and put its length property in the <dd> element
const placesArray = self.placesLived.map((place, index) => {
    const dtElement = document.createElement("dt");
    let ids = {index: index,
        addr:`placesLivedDT${index}`,
        latLong:`placesLivedDDLatLong${index}`,
        weather:`placesLivedDDWeather${index}`};
    dtElement.id = ids.addr;
    const ddElement1 = document.createElement("dd");
    ddElement1.id = ids.latLong;
    const ddElement2 = document.createElement("dd");
    ddElement2.id = ids.weather;
    const ddElement3 = document.createElement("dd");
    ddElement3.innerText = place.length;
    return {ids:ids, place:dtElement, lattitudeLongitude:ddElement1, weather:ddElement2, length:ddElement3}
});

// Step 9: Append the HTML <dt> and <dd> elements created above to the HTML <dl> element with an ID of places-lived
placesArray.map((element) => {
    document.querySelector("#places-lived").appendChild(element.place);
    document.querySelector("#places-lived").appendChild(element.lattitudeLongitude);
    document.querySelector("#places-lived").appendChild(element.weather);
    document.querySelector("#places-lived").appendChild(element.length);
});

self.placesLived.map((place, index) => {
    place.place.requestGEO(document, placesArray[index].ids, recieveGeo);
    place.place.requestWeather(document, placesArray[index].ids, recieveWeather);
    placesArray[index].place.innerText = place.place.getAddress();
    placesArray[index].lattitudeLongitude.innerText = "Pending...";
    placesArray[index].weather.innerText = "Pending...";
});

