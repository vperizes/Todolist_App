import express from "express";
import bodyParser from "body-parser";
import mongoose, { Schema } from "mongoose";

const app = express();
const port = 3000;

// var tasks = [];
// var workTasks = [];


//setting up connection to mongo server and creating (or accessing if already created) todoDB
mongoose.connect("mongodb://127.0.0.1:27017/todoDB");

//schema for new task
const taskSchema = new Schema({
    todo: String
});

//create task and workTask collection/models to replace old arrays
const Task = model.mongoose("Task", taskSchema);
const WorkTask = model.mongoose("WorkTask", taskSchema);

const date = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDay = days[date.getDay()];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentMonth = months[date.getMonth()];

const today = currentDay + ", " + currentMonth + " " + date.getDate();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
})

app.get("/", (req, res) => {
    res.redirect("home");
})

app.get("/home", (req, res) => {
    res.render("home.ejs", {
        tasks: tasks,
        date: today,
        title: "Home"
    })
})

app.post("/addtodo", (req, res) => {
    const inputText = req.body["todo"];
    tasks.push(inputText);
    res.redirect("/home");
})

//specific for work tasks
app.get("/work", (req, res) => {
    res.render("work.ejs", {
        worktasks: workTasks,
        date: today,
        title: "Work"
    })
})

app.post("/addworktodo", (req, res) => {
    const inputText = req.body["worktodo"];
    workTasks.push(inputText);
    res.redirect("/work");
})

