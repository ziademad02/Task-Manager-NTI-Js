const taskInput = document.getElementById("task-input")
const taskForm = document.getElementById("task-form")
const taskList = document.getElementById("task-list")
const filterAll = document.getElementById("filter-all")
const filterCompleted = document.getElementById("filter-completed")
const filterPending = document.getElementById("filter-pending")

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

function saveTaskAtLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function addTask(description) {
    const task = {
        id: Date.now(),
        description,
        completed: false
    }
    tasks.push(task)
    saveTaskAtLocalStorage()
    renderTasks()
}
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId)
    saveTaskAtLocalStorage()
    renderTasks()
}
function toggle(taskId) {
    const task = tasks.find(task => task.id === taskId)
    task.completed = !task.completed
    saveTaskAtLocalStorage()
    renderTasks()
}
function renderTasks(filter = 'all') {
    taskList.innerHTML = ''
    const filterTasks = tasks.filter(task => {
        if (filter === 'completed') {
            return task.completed
        }
        if (filter === 'pending') {
            return !task.completed
        }
        return true;
    })
    filterTasks.forEach(task => {
        const taskElement = document.createElement("div")
        taskElement.className=`bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-white transition hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,20,147,0.4)]`
        if (task.completed) {
            taskElement.classList.add("opacity-70","border-l-4", "border-l-green-400")
        }
        taskElement.innerHTML = `
            <span class="${task.completed ? 'line-through text-gray-400' : 'text-lg font-medium'}">${task.description} </span>
            <div>
                <button onclick="toggle(${task.id})" class="border-none px-4 py-2 rounded-[10px] cursor-pointer font-bold text-white transition-all duration-300 bg-gradient-to-br from-purple-600 to-pink-500 hover:scale-105 hover:shadow-[0_0_15px_#8a2be2]">Toggle</button>
                <button onclick="deleteTask(${task.id})" class="border-none px-4 py-2 rounded-[10px] cursor-pointer font-bold text-white transition-all duration-300 bg-gradient-to-br from-red-500 to-pink-500 hover:scale-105 hover:shadow-[0_0_15px_#ff1744]">Delete</button>
            </div>
        `
        taskList.appendChild(taskElement)
    });
}
taskForm.addEventListener("submit",function(event){
    event.preventDefault()
    const taskDescription=taskInput.value.trim()
    if(taskDescription){
        addTask(taskDescription)
        taskInput.value=''
    }
})
filterAll.addEventListener("click",()=>renderTasks('all'))
filterCompleted.addEventListener("click",()=>renderTasks('completed'))
filterPending.addEventListener("click",()=>renderTasks('pending'))
renderTasks()

AOS.init({
    duration: 800,
    once: true
  });