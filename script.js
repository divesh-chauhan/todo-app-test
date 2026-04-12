const input = document.getElementById("taskText")
const button = document.getElementById("addTask")
const ul = document.getElementById("container")


//* save to localStorage

function saveTask(tasks){
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function getTask(){
    return JSON.parse(localStorage.getItem("tasks"))
}
