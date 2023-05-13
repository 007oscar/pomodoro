const addTaskBtn = document.getElementById("add-task-btn");
const resetTimerBtn = document.getElementById("reset-timer-btn");
const startTimerBtn = document.getElementById("start-timer-btn");

addTaskBtn.addEventListener("click", () => addTask());
let tasks = [];

function renderTask(item) {
  // const item = tasks.length;
  // tasks.push("");

  const taskRow = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task...";
  text.value = tasks[item];
  text.className = "task-input"
  text.addEventListener("change", () => {
    tasks[item] = text.value;
    chrome.storage.sync.set({ tasks });
    console.log(tasks);
  });
  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-btn"
  deleteBtn.value = "X";

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    // tasks.splice(item, 1);
    deleteTask(item);
  });
  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((value, index) => {
    console.log(value, index);
    renderTask(index);
  });
}
function addTask() {
  tasks.push("");
  chrome.storage.sync.set({ tasks });
  renderTasks();
}

function deleteTask(item) {
  tasks.splice(item, 1);
  chrome.storage.sync.set({ tasks });
  renderTasks();
}

function updateTimer() {
  const timerLabel = document.getElementById("timer");
  chrome.storage.local.get(["timer", "timeOptions", "isRunning"], (res) => {
    let timer = res.timer;
    const timeOptions = res.timeOptions ?? 25
    const isRunning = res.isRunning ?? false
    timerLabel.textContent = ""
    let minutes = `${timeOptions - Math.ceil(timer / 60)}`.padStart(2, "0");
    let seconds = "00";
    if (timer % 60 != 0) {
      seconds = `${60 - (timer % 60)}`.padStart(2, "0");
    }
    timerLabel.textContent = `${minutes}:${seconds}`;

    if (isRunning) {
      startTimerBtn.textContent = "Stop Time";
    } else {
      startTimerBtn.textContent = "Start Time";
    }

  });
}

updateTimer();
setInterval(updateTimer, 1000);

chrome.storage.sync.get(["tasks"], (res) => {
  console.log(res);
  tasks = res.tasks ?? [];
  renderTasks();
});
chrome.storage.local.get(["isRunning"], (res) => {
  const isRunning = res.isRunning;
  
  if (isRunning) {
    startTimerBtn.textContent = "Stop Time";
  } else {
    startTimerBtn.textContent = "Start Time";
  }
});

resetTimerBtn.addEventListener("click", () => {
  let timer = 0;
  isRunning = false;
  chrome.storage.local.set({ timer, isRunning });
  startTimerBtn.textContent = "Start Time";
});

startTimerBtn.addEventListener("click", () => {
  console.log(startTimerBtn.value);
  const status = startTimerBtn.textContent;
  let isRunning = false;
  if (status === "Start Time") {
    startTimerBtn.textContent = "Stop Time";
    isRunning = true;
  } else {
    startTimerBtn.textContent = "Start Time";
    isRunning = false;
  }
  chrome.storage.local.set({ isRunning });
});
