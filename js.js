// Variables----------------------------------------------------------------------------
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
let plus = document.getElementById('image-plus');
let notifi = document.querySelector('.notification-container');

// functions-----------------------------------------------------------------------

// when load the app first render list
renderList();

// After EveryTime add a task or delete a task or complete a task, Fist Save Tasks into localstorage
function saveTodo(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// When you Add a task or Delete a task, To Display it on list we need this function
function addTaskToDisplay(task){
    const li = document.createElement('li');
    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.isCompleted ? "checked":""} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="bin.png" class="delete" data-id="${task.id}" />
    `;
    taskList.append(li);
}

// Render List is used to Update the List of Tasks
function renderList () {
    taskList.innerHTML = "";
    
    for(let i = 0 ; i < tasks.length ; i++){
        addTaskToDisplay(tasks[i]);
    }
    saveTodo();
    tasksCounter.innerHTML = tasks.length;
}

// toggel task is used to change the status of task
function toggleTask (taskId) {
    const task = tasks.filter((task) => {
    if(task.id ==taskId){
        return task;
    }
    });
    if(task.length > 0){
        const currentTask = task[0];
        currentTask.isCompleted = !currentTask.isCompleted;
        showNotification("task is toggled successfully");
        saveTodo();
        return;
    }
    showNotification("task is not exist");
}

// To Delete a task
function deleteTask (taskId) {
    let newTasks = tasks.filter(function(task) {
        return task.id !== taskId;
    })
    tasks = newTasks;
    renderList();
}

// To Add a Task
function addTask (task) {

    if(task){
        tasks.push(task);
        renderList();
        showNotification("Task Added Successfully")
      
        return;
    }

    showNotification("This Task Cannot Be Added")
    
}

// To Show a Notification
function showNotification(text) {
    notifi.innerText = text;
    notifi.style.display = "block";
    notifi.style.width = "300px"
    setTimeout(function(){
        notifi.style.display = "none";
        notifi.style.width = "0px";
        notifi.innerText = "";
    },2000);


}
// Add a task when press Enter on keyboard
function handleInputKeypress(event){
    if(event.key === "Enter"){
        const text = event.target.value;

        if(!text){
            showNotification("Task text can not be empty");
            return;
        }
        const task = {
            text : text,
            id : Date.now().toString(),
            isCompleted : false
        }
        
        event.target.value = "";

        addTask(task);
    }
}

// Handle all the click events on Document
function handleEvent(event){
    let trgt = event.target;
    if(trgt == plus){

        const text = document.querySelector('.add-task').value;

        if(!text){
            showNotification("Task text can not be empty");
            return;
        }
        const task = {
            text : text,
            id : Date.now().toString(),
            isCompleted : false
        }
        
        document.querySelector('.add-task').value = "";

        addTask(task);
        return;
    }else if(trgt.className == 'delete'){
        const taskId = trgt.dataset.id;
        deleteTask(taskId);
    }else if(trgt.className == 'custom-checkbox'){
        const taskId = trgt.id;
        toggleTask(taskId);
    }
}

//Event Listener on Document
document.addEventListener('click',handleEvent);
//Event Listener on Input Element
addTaskInput.addEventListener('keyup',handleInputKeypress);