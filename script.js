// CLOCK

function updateClock() {

    let now = new Date();

    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("clock").innerText =
        hours + ":" + minutes + ":" + seconds;

    document.getElementById("date").innerText =
        now.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
}

setInterval(updateClock, 1000);

updateClock();


// TASK MANAGEMENT

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


function addTask() {

    let input =
        document.getElementById("taskInput");

    let priority =
        document.getElementById("priority");

    let name = input.value.trim();

    if (name === "") {

        alert("Please enter a task.");

        return;
    }


    let task = {

        id: Date.now(),

        name: name,

        priority: priority.value,

        completed: false
    };


    tasks.push(task);

    saveTasks();

    input.value = "";

    displayTasks();
}


function displayTasks() {

    let list =
        document.getElementById("taskList");

    list.innerHTML = "";


    tasks.forEach(function(task) {

        let div =
            document.createElement("div");

        div.className = "task";


        div.innerHTML = `

            <div class="task-left">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="completeTask(${task.id})"
                >

                <span class="
                    ${task.completed ? "completed" : ""}
                ">
                    ${task.name}
                </span>

                <small>
                    ${task.priority}
                </small>

            </div>

            <button
                class="delete"
                onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;


        list.appendChild(div);

    });


    updateStatistics();
}


function completeTask(id) {

    tasks.forEach(function(task) {

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
        tasks.filter(function(task) {

            return task.id !== id;

        });


    saveTasks();

    displayTasks();
}


function updateStatistics() {

    let total = tasks.length;

    let completed =
        tasks.filter(function(task) {

            return task.completed;

        }).length;


    let pending =
        total - completed;


    let percentage =
        total === 0
        ? 0
        : Math.round(
            completed / total * 100
        );


    document.getElementById("total")
        .innerText = total;

    document.getElementById("completed")
        .innerText = completed;

    document.getElementById("pending")
        .innerText = pending;

    document.getElementById("percentage")
        .innerText = percentage + "%";
}


displayTasks();


// POMODORO TIMER

let time = 25 * 60;

let timerInterval = null;


function updateTimer() {

    let minutes =
        Math.floor(time / 60);

    let seconds =
        time % 60;


    document.getElementById("timer")
        .innerText =

        String(minutes).padStart(2, "0")
        + ":" +
        String(seconds).padStart(2, "0");
}


function startTimer() {

    if (timerInterval !== null) {

        return;
    }


    timerInterval =
        setInterval(function() {

            if (time > 0) {

                time--;

                updateTimer();

            } else {

                clearInterval(timerInterval);

                timerInterval = null;

                alert("Focus session completed!");
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

    time = 25 * 60;

    updateTimer();
}


updateTimer();
