document.addEventListener("DOMContentLoaded", () => {
  async function fetchTasks() {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    const taskList = document.getElementById("task-list");

    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${task.title}</span>
        <button class="assign-button">Assign</button>
      `;
      taskList.appendChild(li);
    });
  }

  fetchTasks();
});
