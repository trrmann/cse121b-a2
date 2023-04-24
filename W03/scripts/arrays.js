const array = ['one', 'two', 'three'];
//let new_array = arr.map(function callback( currentValue[, index[, array]]) {
//    // return element for new_array
//}[, thisArg])
const arrayHTML = array.map(function strToLi(string) {
    const li = document.createElement("li");
    li.innerText = string;
    return li.outerHTML;
})
const myListHTML = arrayHTML.join('');

document.getElementById("myList").innerHTML = myListHTML;

const letterGrades = ['A', 'B', 'A'];
const letterGradeList = document.createElement('ul');
letterGradeList.innerHTML = letterGrades.map(function strToLi(string) {const li = document.createElement('li');li.innerText = string;return li.outerHTML;}).join('')
document.body.appendChild(letterGradeList);
const grades = letterGrades.map(function letterToPoints(grade) {
    switch(grade) {
        case 'A':
            return 4;
        case 'B':
            return 3;
        case 'C':
            return 2;
        case 'D':
            return 1;
        default:
            return 0;
    }
})
const gradeList = document.createElement('ul');
gradeList.innerHTML = grades.map((string) => {const li = document.createElement('li');li.innerText = string;return li.outerHTML;}).join('')
document.body.appendChild(gradeList);
const gpa = grades.reduce(function accumulate(sum, grade) {return sum + grade},0)/grades.length
const gpaP = document.createElement('p');
gpaP.innerText = gpa
document.body.appendChild(gpaP);
const fruit = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
const fruitP = document.createElement('p');
fruitP.innerText = fruit.join(', ');
document.body.appendChild(fruitP);
const largeFruitNames = fruit.filter(function isLargeFruitName(name) {return name.length > 6})
const largeFruitNamesP = document.createElement('p');
largeFruitNamesP.innerText = largeFruitNames.join(', ');
document.body.appendChild(largeFruitNamesP);
const values = [12, 34, 21, 54]
const valuesP = document.createElement('p');
valuesP.innerText = values.join(', ');
document.body.appendChild(valuesP);
const luckyNumber = 21;
const luckyNumberIndex = values.indexOf(luckyNumber);
const luckyNumberP = document.createElement('p');
luckyNumberP.innerText = luckyNumber + " @ " + luckyNumberIndex;
document.body.appendChild(luckyNumberP);
