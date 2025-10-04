// Get DOM elements
const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.getElementById('clearAllBtn');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');

// Array to store tasks
let tasks = [];

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;

    // Validate input
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        category: category,
        completed: false
    };

    // Add to tasks array
    tasks.push(task);

    // Clear input
    taskInput.value = '';

    // Render tasks
    renderTasks();
}

// Render all tasks
function renderTasks() {
    // Clear task list
    taskList.innerHTML = '';

    // Loop through tasks and create elements
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.category}`;

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleComplete(task.id));

        // Create task text
        const span = document.createElement('span');
        span.className = `task-text ${task.completed ? 'completed' : ''}`;
        span.textContent = task.text;

        // Create category badge
        const badge = document.createElement('span');
        badge.className = `category-badge ${task.category}`;
        badge.textContent = task.category;

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        // Append elements to list item
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(badge);
        li.appendChild(deleteBtn);

        // Append list item to task list
        taskList.appendChild(li);
    });

    // Update counters
    updateCounters();
}

// Toggle task completion
function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    renderTasks();
}

// Delete single task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Clear all tasks
function clearAllTasks() {
    if (tasks.length === 0) {
        alert('No tasks to clear!');
        return;
    }
    
    if (confirm('Are you sure you want to clear all tasks?')) {
        tasks = [];
        renderTasks();
    }
}

// Update task counters
function updateCounters() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
}

// Event listeners
addBtn.addEventListener('click', addTask);
clearAllBtn.addEventListener('click', clearAllTasks);

// Allow Enter key to add task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});