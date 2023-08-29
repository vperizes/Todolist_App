import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var tasks = [];
var workTasks = [];

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
    res.render("home.ejs", {
        tasks: tasks,
        date: today
    });
})

app.post("/addtodo", (req, res) => {
    const inputText = req.body["todo"];
    tasks.push(inputText);
    res.redirect("/");
})

//specific for work tasks
app.get("/work", (req, res) => {
    res.render("work.ejs", {
        worktasks: workTasks,
        date: today
    })
})

app.post("/addworktodo", (req, res) => {
    const inputText = req.body["worktodo"];
    workTasks.push(inputText);
    res.redirect("/work");
})

