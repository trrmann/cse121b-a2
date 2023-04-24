// events.js
let tasks = [];

function convertTaskToHTML(task) {
    const li = document.createElement("LI");
    const ul = document.createElement("UL")
    const descLi = document.createElement("LI");
    const desc = document.createTextNode(task.detail);
    descLi.appendChild(desc);
    descLi.id = "taskDesc_"+task.id;
    descLi.className = "taskDesc";
    ul.appendChild(descLi);
    const button = document.createElement("INPUT");
    button.type = "button";
    button.value = task.completed?"remove":"complete";
    button.id = "taskButton_"+task.id;
    button.className = "taskButton";
    ul.appendChild(button);
//    const copyButton = document.createElement("INPUT");
//    copyButton.type = "button";
//    copyButton.value = "copy";
//    copyButton.id = "copyButton_"+task.id;
//    copyButton.className = "copyButton";
//    ul.appendChild(copyButton);
//    const editButton = document.createElement("INPUT");
//    editButton.type = "button";
//    editButton.value = "edit";
//    editButton.id = "editButton_"+task.id;
//    editButton.className = "editButton";
//    ul.appendChild(editButton);
    ul.id = "taskAttrib_"+task.id;
    ul.className = "taskAttributes";
    li.innerHTML = ul.outerHTML;
    li.id = "task_"+task.id;
    li.className = "task";
    return li.outerHTML;
    //"<li id=\"task_{#}\" class=\"task\"><ul id=\"taskAttrib_{#}\" class=\"taskAttributes\"><li id=\"taskDesc_{#}\" class=\"taskDesc\">{task details}</li><input type=\"button\" value=\"{task state @(complete||remove)}\" id=\"taskButton_{#}\" class=\"taskButton\"></ul></li>"
}
  
function renderTasks(tasks) {
  // get the list element from the DOM
  // make sure it is empty
  // loop through the tasks array. for each of them we need to add the HTML markup for a todo.
  document.querySelector("#todoList").innerHTML = tasks.reduce((finalHTML, task) => {return finalHTML + convertTaskToHTML(task);}, "");
  tasks.map((task) => {document.querySelector("#task_"+task.id).addEventListener("click", manageTasks);});
}

function nextID(dataset, reuseLowest = false) {
    const maxID = dataset.reduce((max, task) => {return task.id > max?task.id:max}, 0)
    const minID = dataset.reduce((min, task) => {return task.id < min?task.id:min}, maxID)
    if (dataset.length==0 || (dataset.length!=0 && reuseLowest && minID>0)) {
        return 0;
    } else if (dataset.length!=0 && !reuseLowest) {
        return maxID+1;
    } else {
        return dataset.reduce((last, task) => {return task.id>last?((task.id-1)==last?task.id:last):last}, 0) + 1;
    }
}

function newTask() {
    // get the value entered into the #todo input
    while(document.querySelector("#todo").value == ""){
        document.querySelector("#todo").value = prompt("Task can't be empty!!  Please enter task:");
    }
    let task = {id:nextID(tasks, true), detail:document.querySelector("#todo").value, completed:false};
    document.querySelector("#todo").value = "";
    // add it to our arrays tasks
    tasks.push(task);
    // render out the list.
    renderTasks(tasks);
  }

function removeTask(taskElement) {
  // note the use of Array.filter to remove the element from our task array
  tasks = tasks.filter((task) => task.id != taskElement.id);
  // this line removes the HTML element from the DOM
  document.querySelector("#todoList").childNodes.forEach(child => {
      if (child.id.replace("task_","")==taskElement.id) {
        child.remove();
      }
    }
  )
}

function completeTask(taskElement) {
  // In this case we need to find the index of the task so we can modify it.
  const taskIndex = tasks.findIndex((task) => task.id === taskElement.id);
  // once we have the index we can modify the complete field.
  // tasks[taskIndex].completed ? false : true is a ternary expression.
  // If the first part is true (left of the ?), then the value on the left of the : will get returned, otherwise the value on the right of the : will be returned.
  tasks[taskIndex].completed = tasks[taskIndex].completed ? false : true;
  document.querySelector("#taskButton_"+tasks[taskIndex].id).value = tasks[taskIndex].completed?"remove":"complete";
  // toggle adds a class if it is not there, removes it if it is.
  document.querySelector("#taskDesc_"+tasks[taskIndex].id).classList.toggle("strike");
  console.log(tasks);
}

function manageTasks(event) {
    // did they click the delete or complete icon?
    const targetID = event.target.id
    console.log(event.target);
    console.log(event.currentTarget);
    // event.target will point to the actual icon clicked on. We need to get the parent li to work with however. HINT: Remember element.closest()? Look it up if you don't
    const action = document.getElementById(targetID).closest(".task").getElementsByClassName("taskAttributes")[0].getElementsByClassName("taskButton")[0].value;
    // because we added 'data-function="delete"' to each icon in a task we can access a dataset property on our target
    // use that in a couple of if statements to decide whether to run removeTask or completeTask
    const id = document.getElementById(targetID).closest(".task").id.replace("task_","")
    const taskElement = tasks.filter((task) => {return task.id==id;})[0]
    if (action.localeCompare("complete")==0) {
        completeTask(taskElement);
    } else {
        removeTask(taskElement);
    }
  }

// we need to attach listeners to the submit button and the list. Listen for a click, call the 'newTask' function on submit and call the 'manageTasks' function if either of the icons are clicked in the list of tasks.
document.querySelector("#submitTask").addEventListener("click", newTask);
