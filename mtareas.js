
/*document.getElementById("addButton"); addEventListener("click", addNewTask);*/



function addNewTask() {


    let areYouSure = confirm("¿Estas seguro que quieres agregar nueva tarea?");

    if (areYouSure) {

        let taskList = document.getElementById("taskList");

        let newTask = document.createElement("li");
        let taskInput = document.getElementById("task_name");
        /* Esta linea es lo mimo que decir:
        let taskInputValue = document.getElementById("task_name").value */
        let taskInputValue = taskInput.value
        let taskContent = document.createTextNode(taskInputValue);
        newTask.appendChild(taskContent);


        let closeSpan = document.createElement("span");
        let characterX = document.createTextNode("\u08D7");
        closeSpan.appendChild(characterX);
        closeSpan.setAttribute("class", "close");
        newTask.appendChild(closeSpan);


        taskList.appendChild(newTask);

    }





}