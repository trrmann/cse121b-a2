/* Lesson 4 */

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
self.placesLived[0].place = "Hartsville, NY";
self.placesLived[0].length = "1970 - 1976";

// Step 9: Add additional objects with the same properties for each place you've lived
self.placesLived[1] = {place:"Parshall, ND", length:"1976 - 1977"}
self.placesLived[2] = {place:"Foxhome, ND", length:"1977 - 1977"}
self.placesLived[3] = {place:"Birthhold, ND", length:"1977 - 1979"}
self.placesLived[4] = {place:"Minot, ND", length:"1979 - 1982"}
self.placesLived[5] = {place:"Minneapolis, MN", length:"1982 - 1982"}
self.placesLived[6] = {place:"Anoka, MN", length:"1982 - 1984"}
self.placesLived[7] = {place:"Hornell, NY", length:"1984 - 1988"}
self.placesLived[8] = {place:"Ft. Knox, KY", length:"1988 - 1988"}
self.placesLived[9] = {place:"Goodfellow AFB, TX", length:"1988 - 1989"}
self.placesLived[10] = {place:"Augsburg, Germany", length:"1989 - 1992"}
self.placesLived[11] = {place:"Hartsville, NY", length:"1992 - 1993"}
self.placesLived[12] = {place:"Hornell, NY", length:"1993 - 1993"}
self.placesLived[13] = {place:"Canesteo, NY", length:"1993 - 1993"}
self.placesLived[14] = {place:"Hornell, NY", length:"1993 - 1993"}
self.placesLived[15] = {place:"Alfred, NY", length:"1993 - 1994"}
self.placesLived[16] = {place:"Amherst, NY", length:"1994 - 1998"}
self.placesLived[17] = {place:"Lockport, NY", length:"1998 - 2001"}
self.placesLived[18] = {place:"Mauldin, SC", length:"2001 - 2003"}
self.placesLived[19] = {place:"Moonville, SC", length:"2003 - 2004"}
self.placesLived[20] = {place:"Mauldin, SC", length:"2004 - 2006"}
self.placesLived[21] = {place:"Simpsonville, SC", length:"2006 - 2023"}

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

// Step 8: For each object in the <em>placesLived</em> property:
// - Create an HTML <dt> element and put its place property in the <dt> element
// - Create an HTML <dd> element and put its length property in the <dd> element
const placesArray = self.placesLived.map((place) => {const dtElement = document.createElement("dt"); dtElement.innerText = place.place;const ddElement = document.createElement("dd"); ddElement.innerText = place.length;return {place:dtElement, length:ddElement}});

// Step 9: Append the HTML <dt> and <dd> elements created above to the HTML <dl> element with an ID of places-lived
placesArray.map((element) => {document.querySelector("#places-lived").appendChild(element.place);document.querySelector("#places-lived").appendChild(element.length)});
