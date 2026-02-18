const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

let tasks = [];
let idCounter = 1;

// CREATE Task
app.post("/api/tasks", (req, res) => {
    const task = {
        id: idCounter++,
        title: req.body.title,
        completed: false
    };
    tasks.push(task);
    res.status(201).json(task);
});

// READ All Tasks
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

// UPDATE Task
app.put("/api/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.completed = req.body.completed ?? task.completed;

    res.json(task);
});

// DELETE Task
app.delete("/api/tasks/:id", (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.json({ message: "Task deleted" });
});

// WEATHER API (External API Integration)
app.get("/api/weather/:city", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=YOUR_API_KEY&units=metric`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching weather data" });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
