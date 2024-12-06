const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById('task-list');

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  }

  getDataFromLocalStorage();
  
addTaskBtn.addEventListener("click",()=>{
    const taskValue = taskInput.value.trim();

    if (taskValue !== "") 
        addTaskToArray(taskValue)
    
    
    console.log(arrayOfTasks);
    taskInput.value="";

})


taskList.addEventListener("click",(e)=>{

    if (e.target.classList.contains("delete-btn")){
    deleteTaskWith(e.target.parentElement.parentElement.getAttribute("data-id"));
        
        e.target.parentElement.parentElement.remove();
    }

    if (e.target.classList.contains("completed-btn")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.parentElement.parentElement.getAttribute("data-id"));
        // Toggle Done Class
        e.target.parentElement.parentElement.classList.toggle("completed-task");
      }



})



function addTaskToArray(taskText) {
    
    const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
    };
    
    arrayOfTasks.push(task);

    addElementsToPageFrom(arrayOfTasks);

    addDataToLocalStorageFrom(arrayOfTasks);
  }


    function addElementsToPageFrom(arrayOfTasks){
        taskList.innerHTML=""
        arrayOfTasks.forEach(task => {
        const newtask = document.createElement("li");
        newtask.classList.add("task")
        

            if(task.completed)
                {newtask.classList.add("completed-task")}

        newtask.setAttribute("data-id", task.id);
        newtask.appendChild(document.createTextNode(task.title));
        
        const btncontainer = document.createElement("div")
        btncontainer.classList.add("btn-container")

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent="Delete"
        deleteBtn.classList.add("delete-btn")

        const completeBtn =document.createElement("button")
        completeBtn.textContent="complete"
        completeBtn.classList.add("completed-btn")

        btncontainer.append(completeBtn,deleteBtn)
        newtask .appendChild(btncontainer)
        taskList.appendChild(newtask)
        });
    }

    function addDataToLocalStorageFrom(arrayOfTasks) {
        window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
      }

      function getDataFromLocalStorage() {
        let data = window.localStorage.getItem("tasks");
        if (data) {
          let tasks = JSON.parse(data);
          addElementsToPageFrom(tasks);
        }
      }


    function deleteTaskWith(taskId) {
        arrayOfTasks = arrayOfTasks.
        filter((task) => task.id != taskId);
        addDataToLocalStorageFrom(arrayOfTasks);
      }




    function toggleStatusTaskWith(taskId) {
        for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
        }
        addDataToLocalStorageFrom(arrayOfTasks);
      }
