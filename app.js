// Required dependecies 
const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

// Create the connection info for the sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'holyCow',
    database: 'emp_tracker_db',
});

// Connecting to the mysql server and database 
connection.connect((err) => {
    if (err) throw err;
    // console.log("we've made contact!");
    start();
});




const start = () => {


    // Banner for the app
    console.log(`╔═════════════════════════════════════════════════════╗
║                                                     ║
║     _____                 _                         ║
║    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   ║
║    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  ║
║    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  ║
║    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  ║
║                    |_|            |___/             ║
║                                                     ║
║     __  __                                          ║
║    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        ║
║    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       ║
║    | |  | | (_| | | | | (_| | (_| |  __/ |          ║
║    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          ║
║                              |___/                  ║
║                                                     ║
\╚═════════════════════════════════════════════════════╝
`);

    inquirer
        .prompt({
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: [
                "Add Department",
                "Add Role",
                "Add Employee",
                "View Department",
                "View Role",
                "View Employee",
                "Update Employee Role",
                "Exit"
            ]
        })
        .then((answer) => {
            console.log(`You've chosen: ${answer.options}`);
            switch (answer.options) {
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmplyee();
                    break;
                case "View Department":
                    viewDepot();
                    break;
                case "View Role":
                    viewRole();
                    break;
                case "View Employee":
                    viewEmp();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "Exit":
                    connection.end();
                    break;
            };
        });
};

const addDepartment = () => {
    console.log("Adding Department");
};

const addRole = () => {
    console.log("Adding a Role");
};

const addEmplyee = () => {
    console.log("Adding Employee");
};

const viewDepot = () => {
    console.log("Let's take a look at a Department");
};

const viewRole = () => {
    console.log("Let's look at the Role we have");
};

const viewEmp = () => {
    console.log("Let's look at the Employees");
};

const updateRole = () => {
    console.log("Time to update the files here");
};