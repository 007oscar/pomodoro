const addTaskBtn = document.getElementById("add-task-btn");

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
  text.addEventListener("change", () => {
    tasks[item] = text.value;
    chrome.storage.sync.set({ tasks });
    console.log(tasks);
  });
  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
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

chrome.storage.sync.get(["tasks"], (res) => {
  console.log(res);
  tasks = res.tasks ?? [];
  renderTasks();
});
