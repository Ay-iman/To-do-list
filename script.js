document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => displayTask(task));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = { text: taskText, completed: false };
  displayTask(task);
  saveTask(task);
  taskInput.value = "";
}

function displayTask(task) {
  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.textContent = task.text;
  li.classList.toggle("completed", task.completed);

  li.addEventListener("click", () => {
    task.completed = !task.completed;
    li.classList.toggle("completed");
    updateTasks();
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.style.marginLeft = "10px";
  removeBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    removeTask(task);
  });

  li.appendChild(removeBtn);
  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t.text !== task.text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTasks() {
  const tasks = Array.from(document.querySelectorAll("#taskList li")).map(
    (li) => ({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    })
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
