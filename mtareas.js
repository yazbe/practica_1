
document.getElementById("addButton").addEventListener("click", addNewTask);
document.getElementById("removeButton").addEventListener("click", removeTask);

let taskList = document.getElementById("taskList");
let taskId = 0;
let maxNumOfTasks = 2;

function addNewTask() {

    let areYouSure = confirm("¿Estás seguro de que quieres agregar una nueva tarea?");

    if (taskId < maxNumOfTasks) {
        if (areYouSure) {

            let taskInput = document.getElementById("task_name");
            /* Esta linea es lo mismo que decir:
            let taskInputValue = document.getElementById("task_name").value */
            let taskInputValue = taskInput.value


            let newTask = document.createElement("li");
            taskId = taskId + 1;
            newTask.setAttribute("id", "task-" + taskId);


            let taskSpan = document.createElement("span");
            taskSpan.setAttribute("class", "content");
            let taskContent = document.createTextNode(taskInputValue);
            taskSpan.appendChild(taskContent);
            newTask.appendChild(taskSpan);

            let removeSpan = document.createElement("span");
            removeSpan.setAttribute("class", "close");
            let icon = document.createElement("i");
            icon.setAttribute("class", "fa fa-trash-o");
            removeSpan.appendChild(icon);
            newTask.appendChild(removeSpan);

            taskList.appendChild(newTask);

            taskInput.value = "";

        }
    } else {
        alert("Has superado el número máximo de tareas");
    }

}

function removeTask() {
    /*
    1 mostrar dialog para confirmar que quiere borrar todas las tareas
    2 sustituye el html del elemento por una cadena vacía
    */

    taskList.innerHTML = "";
}

