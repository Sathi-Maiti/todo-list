const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        span.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        };

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";

        delBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(span);
        li.appendChild(delBtn);

        taskList.appendChild(li);
    });
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();
    taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

renderTasks();