
document.getElementById("addButton").addEventListener("click", addNewTask);
document.getElementById("removeButton").addEventListener("click", removeTasks);

let taskList = document.getElementById("taskList");

let maxNumOfTasks = 5;

let taskArray = [];

let taskInput = document.getElementById("task_name");
/* Esta linea es lo mismo que decir:
let taskInputValue = document.getElementById("task_name").value */
let taskInputValue = ""


function addNewTaskValueToArray() {

    taskInputValue = taskInput.value.trim();

    if (!exits(taskInputValue)) {
        taskArray.push(taskInputValue);
        paintList();
    } else {
        alert("Esta tarea esta repetida")
    }


}


function addNewTask() {

    if (taskArray.length < maxNumOfTasks) {
        let areYouSure = confirm("¿Estás seguro de que quieres agregar una nueva tarea?");

        if (areYouSure) {
            addNewTaskValueToArray();

        }
    } else {
        alert("Has superado el número máximo de tareas");
    }

}


function paintList() {
    console.log('creando la lista ......')
    emptyList();

    taskArray.sort();

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
    removeSpan.addEventListener("click", deleteTask);

    return newTask;
}


function deleteTask() {
    taskArray.splice(this.id, 1);
    paintList();
}


function emptyList() {
    taskList.innerHTML = "";
}

// Esta función hará que el boton borrar todo funcione, porque no solo hay que eliminar la parte de DOM
// que es lo que haces en la función emtyList sino que hay que eliminar los datos del array
function removeAllTasks() {
    taskArray = [];
}


function removeTasks() {

    let areYouSure = confirm("¿Estás seguro de que quieres borrar todas las tareas?");

    if (areYouSure) {
        emptyList();
        //Llamada de la función para eliminar los datos del array
        removeAllTasks();
    }

}

function exits(value) {
    if (taskArray.includes(value)) {
        return true


    } else {
        return false


    }

}
