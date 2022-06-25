const taskTemplate = `
    <div class="item $COMPLETED item-$TASK_ID" >
                        <div class="task-detail">
                            <div >
                                <input type="checkbox" id="$TASK_ID" name="status" value="checkbox" onclick="completeTask(this)"/>
                                <label  for="$TASK_ID"> $TASK_DETAIL </label>
                            </div>
                            <div id="todo-actions">
                                <button onclick="deleteTask('$TASK_ID')"> delete</button>
                                <button class="edit-button" onclick="editTask('$TASK_ID')">edit</button>
                            </div> 
                        </div>
                        <div class="task-update hide">
                            <textarea  class="todo-input update"> $TASK_DETAIL </textarea>
                            <div>
                            <button onclick="updateTask('$TASK_ID')">Update</button>
                            </div>
                        </div>
                </div>
`

let counter = 0;
let edit = false;

let addTodo = function(){
    counter++;

    console.log("add todo "+document.getElementsByClassName('todo-input')[0].value);
    let task = {
        id: counter,
        detail: document.getElementsByClassName('todo-input')[0].value,
        completed: false,
//        delete: false
    }
    

    let newTask =taskTemplate.repeat(1);


    newTask = newTask.replaceAll("$TASK_ID", "task-"+task.id.toString());
    newTask = newTask.replaceAll("$TASK_DETAIL", task.detail);
    newTask = newTask.replaceAll("$COMPLETED", task.completed);

    if(task.completed)
        newTask = newTask.replace("$COMPLETED", "completed");
    else
        newTask = newTask.replace("$COMPLETED", '');


    console.log(newTask);




    document.getElementsByClassName("todo-body")[0].innerHTML += newTask;

}

let completeTask = function(cb) {
   
    let taskElement = getTaskElement(cb.id)

    console.log(taskElement);

    if(cb.checked){
        taskElement.classList.add("completed")
     }else{
        taskElement.classList.remove("completed")
    }

}



let deleteTask = function(id){
    let taskElement = getTaskElement(id);
    taskElement.remove();
}

let editTask = function(id){
    let taskElement = getTaskElement(id);
    let taskDetail = taskElement.querySelector(".task-detail");
    taskDetail.classList.add("hide")
    let taskUpdate = taskElement.querySelector(".task-update");
    //taskDetail.classList.remove("hide")
    taskUpdate.classList.add("show")
    console.log(taskUpdate)
}

let updateTask = function(id){
    let taskElement = getTaskElement(id);

    let textarea = taskElement.querySelector("textarea");
    let taskUpdated = textarea.value; 

    let label = taskElement.querySelector("label");
    console.log("label "+label)
    label.innerHTML = taskUpdated;

    let taskDetail = taskElement.querySelector(".task-detail");
    taskDetail.classList.remove("hide")

    let taskUpdate = taskElement.querySelector(".task-update");
    taskUpdate.classList.remove("show")
    taskUpdate.classList.add("hide")
}


function getTaskElement(id){
    var element = document.getElementsByClassName("todo-body")[0];
    var taskElement = element.querySelector(":scope > .item-"+id);
    return taskElement;
}