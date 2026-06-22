const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        default: "Pending"
    }
});

const Task = mongoose.model("Task", taskSchema);

// CREATE
app.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

// READ
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// UPDATE
app.put("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(task);
});

// DELETE
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});