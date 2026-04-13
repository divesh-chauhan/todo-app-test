const input = document.getElementById("taskText")
const button = document.getElementById("addTask")
const ul = document.getElementById("container")

let editTask = null;

//* save to localStorage

function saveTask(tasks){
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

//* get task from localStorage
function getTask(){
    return JSON.parse(localStorage.getItem("tasks")) || []
}


//* render 
function render(){
    const tasks = getTask()
    ul.innerHTML = ""

    tasks.forEach(task => {
        const li = document.createElement("li")

        li.innerHTML = `
        <span>${task.title}</span>
        <button id="edit-task" data-id="${task.id}">Edit</button>
        <button id="delete-task" data-id="${task.id}">Delete</button>
        `
        ul.appendChild(li)
    })
}


//* add + edit task
button.addEventListener("click", () => {
    const tasks = getTask()
    const taskText = input.value.trim()

    if(editTask){
        if(!taskText){
            return alert("Please enter your task ⚠")
        }

        const updatedTask = tasks.map(task => {
            if(task.id === editTask){
                return {
                    ...task,
                    title : taskText
                }
            }
            return task
        })

        saveTask(updatedTask)
        editTask = null
       
    } else {

        if(!taskText){
            return alert("Please enter your task ⚠")
        }
    
        const newTask = {
            id : Date.now(),
            title : taskText
        }
    
        tasks.push(newTask)
        saveTask(tasks)
    }


    input.value = ""
    button.textContent = "Add Task"
    render()
})


//* delete task
function deleteTask(id){
    let tasks = getTask()
    tasks = tasks.filter(task => task.id !== id)
    saveTask(tasks)
    render()
}


//* event deligation for edit and delete task
ul.addEventListener("click", (event) => {
    const editButton = event.target.closest("#edit-task")
    const deleteButton = event.target.closest("#delete-task")

    if(editButton){
        let li = editButton.parentElement
        let taskTitle = li.querySelector("span").textContent
        input.value = taskTitle
        editTask = Number(editButton.dataset.id)
        button.textContent = "Update Task"
    } else if(deleteButton){
        const id = Number(deleteButton.dataset.id)
        deleteTask(id)
    }
})

document.addEventListener("DOMContentLoaded", render)