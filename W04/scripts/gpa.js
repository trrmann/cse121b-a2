function getGrades(inputSelector) {
    // get grades from the input box
    // split them into an array (String.split(','))
    // clean up any extra spaces, and make the grades all uppercase. (Array.map())
    // return grades
    return inputSelector.value.split(',').map((grade) => {return grade.trim().toUpperCase();});
  }
  
  function lookupGrade(grade) {
    // converts the letter grade to it's GPA point value and returns it
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
  }
  
  function calculateGpa(grades) {
    // gets a list of grades passed in
    // convert the letter grades to gpa points
    // calculates the GPA
    // return the GPA
    return (grades.map(lookupGrade).reduce((sum,grade) => {return sum+grade}, 0)/grades.length).toFixed(2);
  }
  
  function outputGpa(gpa, selector) {
    // takes a gpa value and displays it in the HTML in the element identified by the selector
    return selector.innerText = gpa;
  }
  
  function clickHandler() {
    // when the button in our html is clicked:
    // get the grades entered into the input
    // calculate the gpa from the grades entered
    // display the gpa
    outputGpa(calculateGpa(getGrades(document.querySelector('#grades'))), document.querySelector('#output'));
  }

  const button = document.querySelector('#submitButton');
  button.addEventListener("click", clickHandler);