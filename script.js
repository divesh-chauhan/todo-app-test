const input = document.getElementById("taskText")
const button = document.getElementById("addTask")
const ul = document.getElementById("container")


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


//* add task
button.addEventListener("click", () => {
    const tasks = getTask()
    const taskText = input.value.trim()

    if(!taskText){
        return alert("Please enter your task ⚠")
    }

    const newTask = {
        id : Date.now(),
        title : taskText
    }

    tasks.push(newTask)
    saveTask(tasks)
    
    input.value = ""
    render()
})

document.addEventListener("DOMContentLoaded", render)