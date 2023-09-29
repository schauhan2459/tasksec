const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  "mongodb://canteen:3345@ac-syvaqes-shard-00-00.8f3wqt8.mongodb.net:27017,ac-syvaqes-shard-00-01.8f3wqt8.mongodb.net:27017,ac-syvaqes-shard-00-02.8f3wqt8.mongodb.net:27017/Task-Management?ssl=true&replicaSet=atlas-enxyz5-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(bodyParser.json());

app.use(express.static("public"));

app.post("/api/users", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
      created_at: new Date(),
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Could not create user" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch users" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description, assignedTo, due_date, status } = req.body;
    const newTask = new Task({
      title,
      description,
      assignedTo,
      due_date,
      status,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Could not create task" });
  }
});

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch tasks" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
