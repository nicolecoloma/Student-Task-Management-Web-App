const API_URL = "/api/tasks";

async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task.title} 
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        list.appendChild(li);
    });
}

async function addTask() {
    const input = document.getElementById("taskInput");
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input.value })
    });
    input.value = "";
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const res = await fetch(`/api/weather/${city}`);
    const data = await res.json();
    document.getElementById("weatherResult").innerText =
        `Temperature: ${data.main.temp}°C, ${data.weather[0].description}`;
}

fetchTasks();
