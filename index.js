import express from "express";
import bodyParser from "body-parser";
import mongoose, { Schema } from "mongoose";
import 'dotenv/config';


//Database set up
const DB_URI = process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/todoDB";


//setting up connection to mongo server and creating (or accessing if already created) todoDB
mongoose.connect(DB_URI);

//schema for new task
const taskSchema = new Schema({
    todo: String
});

//create task and workTask collection/models to replace old arrays
const Task = mongoose.model("Task", taskSchema);
const WorkTask = mongoose.model("WorkTask", taskSchema);

//Handling app & express functionality
const app = express();
const port = 3000;

const date = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDay = days[date.getDay()];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentMonth = months[date.getMonth()];

const today = currentDay + ", " + currentMonth + " " + date.getDate();

//functions used for adding and deleting user defined tasks to models
function addTodo(req, Model){
    const inputText = req.body.todo;
    //creating new document in Task collection
    const newTodo = new Model({
        todo: inputText
    });
    newTodo.save();
}

async function deleteTodo(req, Model) {
    try {
        const completedTodo = req.body.checkbox;
        await Model.findByIdAndDelete(completedTodo);
    } catch (error) {
        console.log(error);
    }
}


//app set up and requests
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
    addTodo(req, Task);
    res.redirect("/home");
})

app.post("/deletetodo", (req, res) => {
    deleteTodo(req, Task);
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
    addTodo(req, WorkTask);
    res.redirect("/work");
})

app.post("/deleteWorkTodo", (req, res) => {
    deleteTodo(req, WorkTask);
    res.redirect("/work");
})

