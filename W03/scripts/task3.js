/* Lesson 3 */

/* FUNCTIONS */

// Step 1: Using function declaration, define a function named add that takes two arguments, number1 and number2
// Step 2: In the function, return the sum of the parameters number1 and number2
function add(number1, number2) {
    return number1 + number2
}

// Step 3: Step 3: Using function declaration, define another function named addNumbers that gets the values of two HTML form controls with IDs of addend1 and addend2. Pass them to the add function
// Step 4: Assign the return value to an HTML form element with an ID of sum
function addNumbers() {
    //let addend1 = document.querySelector("#addend1");
    //let addend2 = document.querySelector("#addend2");
    //let sumElement = document.querySelector("#sum");
    //let first = parseInt(addend1.value);
    //let second = parseInt(addend2.value);
    //let sum = add(first, second);
    //sumElement.value = sum;
    document.querySelector("#sum").value = add(parseInt(document.querySelector("#addend1").value), parseInt(document.querySelector("#addend2").value));
}

// Step 5: Add a "click" event listener to the HTML button with an ID of addNumbers that calls the addNumbers function
let addButton = document.querySelector("#addNumbers");
addButton.addEventListener("click", addNumbers);

// Step 6: Using function expressions, repeat Steps 1-5 with new functions named subtract and subtractNumbers and HTML form controls with IDs of minuend, subtrahend, difference and subtractNumbers
const subtract = function(number1, number2) {return number1 - number2};
const subtractNumbers = function() {
//    let minuend = document.querySelector("#minuend");
//    let subtrahend = document.querySelector("#subtrahend");
//    let differenceElement = document.querySelector("#difference");
//    let first = parseInt(minuend.value);
//    let second = parseInt(subtrahend.value);
//    let difference = subtract(first, second);
//    differenceElement.value = difference;
    document.querySelector("#difference").value = subtract(parseInt(document.querySelector("#minuend").value), parseInt(document.querySelector("#subtrahend").value));
}
let subtractButton = document.querySelector("#subtractNumbers");
subtractButton.addEventListener("click", subtractNumbers);

// Step 7: Using arrow functions, repeat Steps 1-5 with new functions named multiply and mulitplyNumbers and HTML form controls with IDs of factor1, factor2, product and multiplyNumbers
const multiply = (number1, number2) => { return number1 * number2; }
const mulitplyNumbers = () => {
//    let factor1 = document.querySelector("#factor1");
//    let factor2 = document.querySelector("#factor2");
//    let productElement = document.querySelector("#product");
//    let first = parseInt(factor1.value);
//    let second = parseInt(factor2.value);
//    let product = multiply(first, second);
//    productElement.value = product;
    document.querySelector("#product").value = multiply(parseInt(document.querySelector("#factor1").value), parseInt(document.querySelector("#factor2").value));
}
let mulitplyButton = document.querySelector("#multiplyNumbers");
mulitplyButton.addEventListener("click", mulitplyNumbers);

// Step 8: Using any of the three function declaration types, repeat Steps 1-5 with new functions named divide and divideNumbers and HTML form controls with IDs of dividend, divisor, quotient and divideNumbers
const divide = (number1, number2) => { return number1 / number2; }
const divideNumbers = () => {
//    let dividend = document.querySelector("#dividend");
//    let divisor = document.querySelector("#divisor");
//    let quotientElement = document.querySelector("#quotient");
//    let first = parseInt(dividend.value);
//    let second = parseInt(divisor.value);
//    let quotient = divide(first, second);
//    quotientElement.value = quotient;
    document.querySelector("#quotient").value = divide(parseInt(document.querySelector("#dividend").value), parseInt(document.querySelector("#divisor").value));
}
let divideButton = document.querySelector("#divideNumbers");
divideButton.addEventListener("click", divideNumbers);

// Step 9: Test all of the mathematical functionality of the task3.html page.


/* BUILT-IN METHODS */

// Step 1: Declare and instantiate a variable of type Date to hold the current date
let date = new Date()

// Step 2: Declare a variable to hold the current year
let year;

// Step 3: Using the variable declared in Step 1, call the built-in getFullYear() method/function and assign it to the variable declared in Step 2
year = date.getFullYear();

// Step 4: Assign the current year variable to an HTML form element with an ID of year
document.querySelector('#year').innerHTML = year;

/* ARRAY METHODS */

// Step 1: Declare and instantiate an array variable to hold the numbers 1 through 25
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

// Step 2: Assign the value of the array variable to the HTML element with an ID of "array"
document.querySelector('#array').innerHTML = array;

// Step 3: Use the filter array method to find all of the odd numbers of the array variable and assign the reult to the HTML element with an ID of "odds" ( hint: % (modulus operartor) )
//const validateOdd = (number) => { return number % 2 == 1};
//document.querySelector('#odds').innerHTML = array.filter(validateOdd);
document.querySelector('#odds').innerHTML = array.filter((number) => { return number % 2 == 1});

// Step 4: Use the filter array method to find all of the even numbers of the array variable and assign the result to the HTML element with an ID of "evens"
//const validateEven = (number) => { return number % 2 == 0};
//document.querySelector('#evens').innerHTML = array.filter(validateEven);
document.querySelector('#evens').innerHTML = array.filter((number) => { return number % 2 == 0});

// Step 5: Use the reduce array method to sum the array variable elements and assign the result to the HTML element with an ID of "sumOfArray"
//const accumulate = (accumulator, aCount) => accumulator += aCount;
//document.querySelector('#sumOfArray').innerHTML = array.reduce(accumulate);
document.querySelector('#sumOfArray').innerHTML = array.reduce((accumulator, aCount) => accumulator += aCount);

// Step 6: Use the map array method to multiple each element in the array variable by 2 and assign the result to the HTML element with an ID of "multiplied"
//const multiplyByTwo = (aCount) => aCount *= 2;
//document.querySelector('#multiplied').innerHTML = array.map(multiplyByTwo);
document.querySelector('#multiplied').innerHTML = array.map((aCount) => aCount *= 2);

// Step 7: Use the map and reduce array methods to sum the array elements after multiplying each element by two.  Assign the result to the HTML element with an ID of "sumOfMultiplied"
//let sum = array.map((aCount) => aCount *= 2)
//        .reduce((accumulator, aCount) => accumulator += aCount);
//document.querySelector('#sumOfMultiplied').innerHTML = sum;
document.querySelector('#sumOfMultiplied').innerHTML = array.map((aCount) => aCount *= 2)
                                                        .reduce((accumulator, aCount) => accumulator += aCount);
