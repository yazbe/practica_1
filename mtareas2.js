document.getElementById("addButton").addEventListener("click", addNewTask);
document.getElementById("removeButton").addEventListener("click", removeTasks);
document.getElementById("removeCompetedButton").addEventListener("click", removeCompletedTasks);
document.getElementById("arrangeButton").addEventListener("click", arrangeTasks);


let taskList = document.getElementById("taskList");

let maxNumOfTasks = 5;

//data source 
let taskArray = [];

//task input value is out of blocks to be able to access it in all file
let taskInput = document.getElementById("task_name");
/* Esta linea es lo mismo que decir:
let taskInputValue = document.getElementById("task_name").value */
let taskInputValue = ""


function addNewTaskValueToArray() {
    taskInputValue = taskInput.value.trim()

    //comprobar si existe
    if (!exits(taskInputValue)) {
        let task = {
            "completed": false,
            "name": taskInputValue,
        }

        taskArray.push(task);

        paintList();
    } else {
        alert("Esta tarea esta repetida")
    }
}

function exits(value) {

    taskArray.forEach(function (taskItem) {
        if (taskItem.name == value) {
            return true;
        }
    });
    return false;
}

function addNewTask() {

    let areYouSure = confirm("¿Estás seguro de que quieres agregar una nueva tarea?");

    if (taskArray.length < maxNumOfTasks) {
        if (areYouSure) {

            addNewTaskValueToArray();

        }
    } else {
        alert("Has superado el número máximo de tareas");
    }

}

function paintList(sort) {
    //empty list to avoid list to paint again old elements
    eraseList();

    //sort list taking in mind that we sort by name
    //two ways of writing the same (with {} or with =>)
    //taskArray.sort((a, b) => a.name.localeCompare(b.name);
    if (sort) {
        taskArray.sort(function (a, b) {
            return a.name.localeCompare(b.name)
        });
    }

    //create list elements
    for (var i = 0; i < taskArray.length; i++) {
        let newTask = createListItem(i, taskArray[i]);

        taskList.appendChild(newTask);

        taskInput.value = "";

    }
}

function createListItem(id, task) {
    let newTask = document.createElement("li");
    newTask.setAttribute("id", id);

    //add span with completed icon button
    let completedSpan = document.createElement("span");
    //usamos el id del elemento padre (<li>), ya que representa el index del objeto task enel array
    //completedSpan.setAttribute("id", "completed-" + id);
    let completedIcon = document.createElement("i");
    completedIcon.setAttribute("class", "fa fa-check");
    completedSpan.appendChild(completedIcon);
    newTask.appendChild(completedSpan);
    //añadimos el evento onClick a cada completedSpan que creamos de manera dinámica
    completedSpan.addEventListener("click", completeTask);

    //add span with task name (previosly taskInputValue)
    let taskSpan = document.createElement("span");
    //add class completed only if task is completed
    if (task.completed) {
        taskSpan.setAttribute("class", "content completed");
    } else {
        taskSpan.setAttribute("class", "content");
    }
    let taskContent = document.createTextNode(task.name);
    taskSpan.appendChild(taskContent);
    newTask.appendChild(taskSpan);

    //add span with remove icon button
    let removeSpan = document.createElement("span");
    //usamos el id del elemento padre (<li>), ya que representa el index del objeto task enel array
    //removeSpan.setAttribute("id", "remove-" + id);
    let removeIcon = document.createElement("i");
    removeIcon.setAttribute("class", "fa fa-trash-o");
    removeSpan.appendChild(removeIcon);
    newTask.appendChild(removeSpan);
    //añadimos el evento onClick a cada removeSpan que creamos de manera dinámica
    removeSpan.addEventListener("click", deleteTask);

    return newTask;

}

function completeTask() {

    //id del padre -> index
    //crear una copia de la task con el completed al reves
    let oldTask = taskArray[this.parentElement.id];
    let oldCompleted = oldTask.completed;
    oldTask.completed = !oldCompleted;

    //sustituir mi copia por la antigua task
    taskArray.splice(this.parentElement.id, 1, oldTask);

    //repintar
    paintList();

}

function deleteTask() {
    //this es el elemento sobre el que hemos hecho click, y su id se lo hemos añadido nosotros al
    //crear el span, 
    //necesito acceder al padre de this (<li>), y sacar su id
    taskArray.splice(this.parentElement.id, 1);
    paintList();

}

function removeTasks() {

    let areYouSure = confirm("¿Estás seguro de que quieres borrar todas las tareas?");

    if (areYouSure) {
        taskArray = [];
        paintList();
    }

}

function removeCompletedTasks() {
    taskArray.forEach(function (task, index) {
        if (task.completed) {
            taskArray.splice(index, 1);
        }
    });

    paintList();
}


function eraseList() {
    taskList.innerHTML = "";
}


function arrangeTasks() {

    taskArray.sort(function (a, b) {
        return a.completed - b.completed
    });

    paintList(false);

}