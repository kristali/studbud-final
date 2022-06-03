/*//////////////// start TASKS start ////////////////*/

const taskForm = document.getElementById("taskform");
const button = document.querySelector("#taskform > button")
var taskInput = document.getElementById("taskInput");
var tasklist = document.querySelector(".task-list")
var taskFormTitle = document.querySelector(".form-header h3");

var taskNameInput = document.getElementById("taskNameInput");
var descriptionInput = document.getElementById("descriptionInput");
var dueDateInput = document.getElementById("dueDateInput");
var statusInput = document.getElementById("statusInput");
var estimatedTimeHrInput = document.getElementById("estimatedTimeHrInput");
var estimatedTimeMinInput = document.getElementById("estimatedTimeMinInput");
var priorityInput = document.getElementsByName("priority");

//Function: Task form submit
taskform.addEventListener("submit", function (event) {
  event.preventDefault();
  //validate input values
  let task = taskInput.value;
  let description = descriptionInput.value;
  let dueDate = dueDateInput.value;
  var categoryInput = document.querySelectorAll('input[id=categoryInput]:checked');
  let category = Array.from(categoryInput).map(checkbox => checkbox.value);
  let status = statusInput.value;
  let estimatedTimeHr = estimatedTimeHrInput.value;
  let estimatedTimeMin = estimatedTimeMinInput.value;
  let priority;
  for (let i = 0; i < priorityInput.length; i++) {
    if (priorityInput[i].checked)
      priority = priorityInput[i].value;
  }

  addTaskModal.classList.remove("active");
  overlay.classList.remove("active");

  if (task) {
    addTask(task, description, dueDate, category, status, estimatedTimeHr, estimatedTimeMin, priority);
  }
});

//Function: Add task
function addTask(taskName, description, dueDate, category, status, estimatedTimeHr, estimatedTimeMin, priority) {
  let task = {
    id: Date.now(),
    taskName,
    description,
    dueDate,
    category,
    status,
    estimatedTimeHr,
    estimatedTimeMin,
    priority,
  };
  console.log(taskListArray);
  taskListArray.push(task);
  //Store new tasks in local storage
  localStorage.setItem("tasks", JSON.stringify(taskListArray));
  renderTask(task);
};

//Load the saved tasks
let taskListArray = JSON.parse(localStorage.getItem("tasks")) || [];
//Render saved tasks
taskListArray.forEach(renderTask);


//Function: Create new task on page
function renderTask(task) {
  // Create HTML elements
  let item = document.createElement("li");
  item.classList.add("task");
  item.setAttribute('data-id', task.id);
  item.innerHTML = `
      <div class="header-details">
        <span class="dateTag">${task.dueDate}</span>
        <p class="estTime">${task.estimatedTimeHr}hr${task.estimatedTimeMin}min</p>
        <span class="priorityTag ${task.priority}">${task.priority}</span>
      </div>
      </div>
      <div class="content-details">
        <p>${task.taskName}</p>
        <span class="description-tag">${task.description}</span>
      </div>
     `

  tasklist.appendChild(item);

  //Add draggable attribute to cards when task is created
  item.setAttribute('draggable', "true");
  item.classList.add('taskCard');
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);

  
  // Extra Task DOM elements
  // Bottom section of task cards
  let bottomDetails = document.createElement('div');
  bottomDetails.className = "bottom-details";
  bottomDetails.innerHTML =`
    <span>${task.category}</span>`
  //Append to task card 
  item.append(bottomDetails);

  //Delete icon
  let delButtonIcon = document.createElement("i");
  delButtonIcon.className = "fa-solid fa-trash-can";
  //Append to task card 
  bottomDetails.append(delButtonIcon);
  

  // Event Listeners for delete icon
  delButtonIcon.addEventListener("click", function (event) {
    event.preventDefault();
    taskForm.reset(); 

    let id = event.target.parentElement.getAttribute('data-id');
    let index = taskListArray.findIndex(task => task.id === Number(id));
    removeItemFromArray(taskListArray, index)
    item.remove();
    taskListArray =  taskListArray.filter((e) => e !== item); //Remove saved task  
    localStorage.setItem("tasks", JSON.stringify(taskListArray)) //Update 
  });

  // Clear the input form
  taskForm.reset(); 
}

function removeItemFromArray(arr, index) {
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr;
}

/*//////////////// end TASKS end ////////////////*/


/*//////////////// start TASK BOARD start ////////////////*/

/*-------- start DRAGGABLE TASK CARDS/ITEMS start --------*/
const taskCards = document.querySelectorAll(".taskCard");
const constantCols = document.querySelectorAll("#task-board-container .dropCol");
let draggableTask = null;

//add drag function event listeners to each task
taskCards.forEach((taskCard) => {
  taskCard.addEventListener("dragstart", dragStart);
  taskCard.addEventListener("dragend", dragEnd);
});

//drag start 
function dragStart() {
  draggableTask = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
  //console.log("dragStart");
}

function dragEnd() {
  draggableTask = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
  //console.log("dragEnd");
}

//Add event listeners for columns to be dragged/dropped into 
constantCols.forEach(dropCol => {
  dropCol.addEventListener("dragover", dragOver);
  dropCol.addEventListener("dragenter", dragEnter);
  dropCol.addEventListener("dragleave", dragLeave);
  dropCol.addEventListener("drop", dragDrop);
});

function dragOver(event) {
  event.preventDefault();
}

function dragEnter() {
  this.style.border = "1px solid red";
  console.log("dragEnter");
}

function dragLeave() {
  this.style.border = "none";
  console.log("dragLeave");
}

function dragDrop() {
  this.style.border = "none";
  this.appendChild(draggableTask);
  console.log();
}
/*-------- end DRAGGABLE TASK CARDS/ITEMS end --------*/

/*-------- start ADD TASK BOARD COLUMN start --------*/
const container = document.getElementById("task-board-container");
const addColButton = document.querySelector("#columnForm > button");
var colInput = document.getElementById("columnInput");

//Function: column form submit
columnForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const newCol = document.createElement('div');
    newCol.classList.add("statusColumn", "glass");
    let colName = colInput.value;
    //input user input as column value
    newCol.setAttribute("value", colName);

    //Adding DOM elements of columns
    //input user input as tile and id
    newCol.innerHTML = `
      <div class="status-title">
        <h3>${colName}</h3>
        <button class="btn editCol" style="background:none; color: #404040;"><i class='fa fa-edit'></i>
        </button>
      </div>
      <div id="taskList" class="task-list dropCol">

      </div>
    </div>
      `;
    container.append(newCol);

    //update visibility of modal & overlay form when opened/closed
    addColumnModal.classList.remove("active");
    overlay.classList.remove("active");
  });
/*-------- end ADD TASK BOARD COLUMN end --------*/

/*//////////////// end TASK BOARD end ////////////////*/
