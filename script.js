```javascript
// ========================================
// DIGITAL CLOCK
// ========================================

function updateClock() {

    const now = new Date();

    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("clock").innerText =
        `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

updateClock();


// ========================================
// TASK MANAGEMENT
// ========================================

let tasks =
    JSON.parse(localStorage.getItem("timeflowTasks")) || [];

let currentFilter = "all";


function saveTasks() {

    localStorage.setItem(
        "timeflowTasks",
        JSON.stringify(tasks)
    );
}


function addTask() {

    const input =
        document.getElementById("taskInput");

    const priority =
        document.getElementById("priority");

    const taskName =
        input.value.trim();


    if (taskName === "") {

        alert("Please enter a task.");

        input.focus();

        return;
    }


    const task = {

        id: Date.now(),

        name: taskName,

        priority: priority.value,

        completed: false
    };


    tasks.push(task);

    saveTasks();

    input.value = "";

    displayTasks();
}


function displayTasks() {

    const taskList =
        document.getElementById("taskList");


    taskList.innerHTML = "";


    let filteredTasks = tasks;


    if (currentFilter === "pending") {

        filteredTasks =
            tasks.filter(task => !task.completed);
    }


    if (currentFilter === "completed") {

        filteredTasks =
            tasks.filter(task => task.completed);
    }


    if (filteredTasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-task">
                <p>No tasks found.</p>
            </div>
        `;

    } else {

        filteredTasks.forEach(task => {

            const taskDiv =
                document.createElement("div");


            taskDiv.className = "task";


            let priorityClass =
                task.priority.toLowerCase();


            taskDiv.innerHTML = `

                <div class="task-left">

                    <input
                        type="checkbox"
                        ${task.completed ? "checked" : ""}
                        onchange="completeTask(${task.id})"
                    >

                    <span class="
                        task-name
                        ${task.completed ? "completed" : ""}
                    ">
                        ${escapeHTML(task.name)}
                    </span>

                    <span class="
                        priority
                        ${priorityClass}
                    ">
                        ${task.priority}
                    </span>

                </div>


                <button
                    class="delete"
                    onclick="deleteTask(${task.id})"
                    title="Delete task">

                    <i class="fa-solid fa-trash"></i>

                </button>
            `;


            taskList.appendChild(taskDiv);

        });
    }


    updateStatistics();
}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


function completeTask(id) {

    tasks.forEach(task => {

        if (task.id === id) {

            task.completed =
                !task.completed;
        }
    });


    saveTasks();

    displayTasks();
}


function deleteTask(id) {

    tasks =
        tasks.filter(task => task.id !== id);


    saveTasks();

    displayTasks();
}


function filterTasks(filter, button) {

    currentFilter = filter;


    document
        .querySelectorAll(".filter")
        .forEach(btn => {

            btn.classList.remove("active-filter");

        });


    button.classList.add("active-filter");


    displayTasks();
}


function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const pending =
        total - completed;


    const percentage =
        total === 0
        ? 0
        : Math.round(
            (completed / total) * 100
        );


    document.getElementById("total")
        .innerText = total;


    document.getElementById("completed")
        .innerText = completed;


    document.getElementById("pending")
        .innerText = pending;


    document.getElementById("percentage")
        .innerText = percentage + "%";


    document.getElementById("taskCount")
        .innerText =
        `${total} ${total === 1 ? "task" : "tasks"}`;
}


displayTasks();


// ========================================
// POMODORO TIMER
// ========================================

let timeLeft = 25 * 60;

let timerInterval = null;


function updateTimer() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;


    document.getElementById("timer")
        .innerText =

        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;
}


function startTimer() {

    if (timerInterval !== null) {

        return;
    }


    timerInterval =
        setInterval(() => {

            if (timeLeft > 0) {

                timeLeft--;

                updateTimer();

            } else {

                clearInterval(timerInterval);

                timerInterval = null;

                alert(
                    "🎉 Focus session completed!"
                );
            }

        }, 1000);
}


function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;
}


function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timeLeft = 25 * 60;

    updateTimer();
}


updateTimer();


// ========================================
// ENTER KEY FOR ADD TASK
// ========================================

document
    .getElementById("taskInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            addTask();
        }
    });
```

