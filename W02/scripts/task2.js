/* Lesson 2 */

/* VARIABLES */

// Step 1: declare and instantiate a variable to hold your name
let varName = 'Tracy Mann'


// Step 2: place the value of the name variable into the HTML file (hint: document.querySelector())
let nameElement = document.querySelector('#name');
nameElement.innerHTML = varName;


// Step 3: declare and instantiate a variable to hold the current year
let year = new Date().getFullYear()


// Step 4: place the value of the current year variable into the HTML file
let yearElement = document.querySelector('#year');
yearElement.innerHTML = year;


// Step 5: declare and instantiate a variable to hold the name of your picture
let image = 'images/tracy_office.jpg'


// Step 6: copy your image into the "images" folder
// done

// Step 7: place the value of the picture variable into the HTML file (hint: document.querySelector().setAttribute())
document.querySelector('img')
		.setAttribute('src', image);
// had to add width attribute due to size of my photo
document.querySelector('img')
		.setAttribute('width', '500');


/* ARRAYS */

// Step 1: declare and instantiate an array variable to hold your favorite foods
const favFoods = ["ribs", "steak", "ceveche", "cherry pie"];


// Step 2: place the values of the favorite foods variable into the HTML file
let foodElement = document.querySelector('#food');
foodElement.innerHTML = favFoods;


// Step 3: declare and instantiate a variable to hold another favorite food
let altFood = "roast beef";


// Step 4: add the variable holding another favorite food to the favorite food array
favFoods.push(altFood);


// Step 5: repeat Step 2
foodElement.innerHTML = favFoods;


// Step 6: remove the first element in the favorite foods array
favFoods.shift();


// Step 7: repeat Step 2
foodElement.innerHTML = favFoods;


// Step 8: remove the last element in the favorite foods array
favFoods.pop();


// Step 7: repeat Step 2
foodElement.innerHTML = favFoods;

