
let currentDateAndTime = Date()

console.log("It is now "+currentDateAndTime)

let theTotal = total(10.1, 20.2, 30.3, 40.4, 50.5, 60.6, 70.7, 80.8, 90.9, 100.01)

console.log("The total is "+theTotal)

function total(...theNumbers){
	let sum = 0
	theNumbers.forEach((item) => {sum += Number(item);});
	return sum
}
