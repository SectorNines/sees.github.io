let task = [];

// Function to add a new task       
function addTask() {
    const taskinput = document.querySelector('#taskinput');
    const dateinput = document.querySelector('#dateinput');

    if (taskinput.value === "" || dateinput.value === "") {
        alert("Please fill in both fields - Tolong isi kedua.");
        return;
    } else {
        const newTask = {
            id: Date.now(),
            name: taskinput.value,
            date: dateinput.value,
            completed: false
        };

        task.push(newTask);
        taskinput.value = "";
        dateinput.value = "";
        displayTasks();
    }
}

// Function to display tasks
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = `<header class="text-center font-semibold mb-[8px]">Tasks</header>`; // reset header + tasks

    task.forEach((taskItem) => {
        const taskElement = document.createElement('div');
        taskElement.className = "task-item flex justify-between items-center p-[8px]";
        taskElement.id = `task-${taskItem.id}`;
        taskElement.innerHTML = `
            <p class="text-gray-800 font-semibold">${taskItem.name}</p>
            <p class="text-gray-500 text-sm">${taskItem.date}</p>
            <button class="bg-green-500 text-white p-[4px] rounded" onclick="toggleComplete(${taskItem.id})">
                ${taskItem.completed ? "Undo" : "Complete"}
            </button>
            <button class="bg-red-500 text-white p-[4px] rounded" onclick="deleteTask(${taskItem.id})">Delete</button>
        `;
        taskList.appendChild(taskElement);
    });
}

//delete a specific task
function deleteTask(id) {
    task = task.filter(taskItem => taskItem.id !== id);
    displayTasks();
}

//delete all tasks
function deleteAllTasks() {
    task = [];
    displayTasks();
}

// Function to toggle task completion
function toggleComplete(id) {
    const taskItem = task.find(item => item.id === id);     
    if (taskItem) {
        taskItem.completed = !taskItem.completed;
        displayTasks();
    }   
}

//function to filter tasks
function filterTasks(showCompleted) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = `<header class="text-center font-semibold mb-[8px]">Tasks</header>`; // reset header + tasks   
    task.forEach((taskItem) => {
        if (showCompleted || !taskItem.completed) {
            const taskElement = document.createElement('div');
            taskElement.className = "task-item flex justify-between items-center p-[8px]";
            taskElement.id = `task-${taskItem.id}`;
            taskElement.innerHTML = `
                <p class="text-gray-800">${taskItem.name} - ${taskItem.date}</p>
                <button class="bg-green-500 text-white p-[4px] rounded" onclick="toggleComplete(${taskItem.id})">
                    ${taskItem.completed ? "Undo" : "Complete"}
                </button>
                <button class="bg-red-500 text-white p-[4px] rounded" onclick="deleteTask(${taskItem.id})">Delete</button>  
            `;
            taskList.appendChild(taskElement);
        }   
    });
}

// Event listeners for buttons
document.querySelector('.bg-green-200').addEventListener('click', () => filterTasks(true));
document.querySelector('.bg-gray-200').addEventListener('click', () => filterTasks(false));
document.querySelector('.bg-red-500').addEventListener('click', deleteAllTasks);
// Initial display of tasks
displayTasks();
// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    displayTasks();
});
// Add event listener for the form submission
document.querySelector('#todo-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
    addTask(); // Call the addTask function
}); 
// Add event listener for the delete all button
document.querySelector('.bg-red-500').addEventListener('click', deleteAllTasks);
// Add event listener for the filter buttons
document.querySelector('.bg-green-200').addEventListener('click', () => filterTasks(true));
document.querySelector('.bg-gray-200').addEventListener('click', () => filterTasks(false));
// Add event listener for the add task button
document.querySelector('.bg-blue-500').addEventListener('click', addTask);
// Add event listener for the task input form
document.querySelector('#todo-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
    addTask(); // Call the addTask function
}); 
