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
const Task = mongoose.model("Task", taskSchema);
const WorkTask = mongoose.model("WorkTask", taskSchema);


const date = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDay = days[date.getDay()];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentMonth = months[date.getMonth()];

const today = currentDay + ", " + currentMonth + " " + date.getDate();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
})

app.get("/", (req, res) => {
    res.redirect("home");
})

app.get("/home", (req, res) => {
    async function run() {
        const tasks = await Task.find({});
        res.render("home.ejs", {
            tasks: tasks,
            date: today,
            title: "Home"
        })
    }
    run();
})

app.post("/addtodo", (req, res) => {
    const inputText = req.body["todo"];
    //creating new document in Task collection
    const newTodo = new Task({
        todo: inputText
    });
    newTodo.save();
    res.redirect("/home");
})

app.post("/deletetodo", (req, res) => {
    async function deleteTodo() {
        try {
            const completedTodo = req.body.checkbox
            await Task.findByIdAndDelete(completedTodo);
        } catch (error) {
            console.log(error);
        }
    }
    deleteTodo();
    res.redirect("/home");
})

//specific for work tasks
app.get("/work", (req, res) => {
    async function run() {
        const workTasks = await WorkTask.find({});
        res.render("work.ejs", {
            worktasks: workTasks,
            date: today,
            title: "Work"
        })
    }
    run();
})

app.post("/addworktodo", (req, res) => {
    const inputText = req.body["worktodo"];
    const newWorkTodo = new WorkTask({
        todo: inputText
    });
    newWorkTodo.save();
    res.redirect("/work");
})

app.post("/deleteWorkTodo", (req, res) => {
    async function deleteWorkTodo () {
        try {
            const completedWorktodo = req.body.checkbox;
            await WorkTask.findByIdAndDelete(completedWorktodo);
        } catch (error) {
            console.log(error);
        }
    }
    deleteWorkTodo();
    res.redirect("/work");
})

