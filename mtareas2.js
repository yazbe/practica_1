document.getElementById("addButton").addEventListener("click", addNewTask);
document.getElementById("removeButton").addEventListener("click", removeTasks);

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
    taskInputValue = taskInput.value

    taskArray.push(taskInputValue);
    //console.log(taskArray);
}


function addNewTask() {

    let areYouSure = confirm("¿Estás seguro de que quieres agregar una nueva tarea?");

    if (taskArray.length < maxNumOfTasks) {
        if (areYouSure) {

            addNewTaskValueToArray();

            paintList();

        }
    } else {
        alert("Has superado el número máximo de tareas");
    }

}

function paintList() {
    //empty list to avoid list to paint again old elements
    emptyList();

    //sort list
    taskArray.sort();

    //create list elements
    for (var i = 0; i < taskArray.length; i++) {
        let newTask = createListItem(i, taskArray[i]);

        taskList.appendChild(newTask);

        taskInput.value = "";

    }
}

function createListItem(id, taskInputValue) {
    let newTask = document.createElement("li");

    let taskSpan = document.createElement("span");
    taskSpan.setAttribute("class", "content");
    let taskContent = document.createTextNode(taskInputValue);
    taskSpan.appendChild(taskContent);
    newTask.appendChild(taskSpan);

    let removeSpan = document.createElement("span");
    removeSpan.setAttribute("id", id);
    let icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-trash-o");
    removeSpan.appendChild(icon);
    newTask.appendChild(removeSpan);
    //añadimos el evento onClick a cada removeSpan que creamos de manera dinámica
    removeSpan.addEventListener("click", deleteTask);

    return newTask;

}

function deleteTask() {
    //this es el elemento sobre el que hemos hecho click, y su id se lo hemos añadido nosotros al
    //crear el span, en la línea 72
    taskArray.splice(this.id, 1);
    paintList();

}


function emptyList() {
    taskList.innerHTML = "";
}

function removeTasks() {

    let areYouSure = confirm("¿Estás seguro de que quieres borrar todas las tareas?");

    if (areYouSure) {
        emptyList();
    }

}

