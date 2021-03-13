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


const start = () => {



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

    inquirer
        .prompt({
            type: "input",
            message: "What deparment do you want to add?",
            name: "department"
        })
        .then((answer) => {
            const deparment = answer.department;
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: deparment,
                },
                (err) => {
                    if (err) throw err;
                    console.log("Adding Department");
                    start();
                }

            );
        });
};

const addRole = () => {

    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the job title being added?",
                name: "title",
            },
            {
                type: "input",
                message: "What is the salary for this added position?",
                name: "salary",
            },
            {
                type: "input",
                message: "What is the department ID for this position?",
                name: "departmentID",
            }
        ])
        .then((answer) => {
            const title = answer.title;
            const salary = answer.salary;
            const departmentID = answer.departmentID;

            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: title,
                    salary: salary,
                    department_id: departmentID,
                },
                (err) => {
                    if (err) throw err;
                    console.log("Adding a Role");
                    start();
                }
            );
        });
};

const addEmplyee = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Waht is the employee's first name?",
                name: "firstName",
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "lastName",
            },
            {
                type: "input",
                message: "What is the employee's ID?",
                name: "roleID",
            },
            {
                type: "input",
                message: "What is the emplyee's manger ID?",
                name: "managerID"
            }

        ])
        .then((answer) => {
            const firstName = answer.firstName;
            const lastName = answer.lastName;
            const roleID = answer.roleID;
            const managerID = answer.managerID;

            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: firstName,
                    last_name: lastName,
                    role_id: roleID,
                    manager_id: managerID,
                },
                (err) => {
                    if (err) throw err;
                    console.log("Adding Employee");
                    start();
                }
            );
        });

};

const viewDepot = () => {
    console.log("Let's take a look at a Department");
    connection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.table(data);
        start();
    })
};

const viewRole = () => {
    console.log("Let's look at the Role we have");
    connection.query("SELECT * FROM role", (err, data) => {
        if (err) throw err;
        console.table(data);
        start();
    })
};

const viewEmp = () => {
    console.log("Let's look at the Employees");
    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.table(data);
        start();
    })
};

function askId() {
    return ([
        {
            name: "name",
            type: "input",
            message: "What is the employe ID?:  "
        }
    ]);
}

async function updateRole() {
    const employeeId = await inquirer.prompt(askId());

    connection.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
        if (err) throw err;
        const { role } = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: () => res.map(res => res.title),
                message: 'What is the new employee role?: '
            }
        ]);
        let roleId;
        for (const row of res) {
            if (row.title === role) {
                roleId = row.id;
                continue;
            }
        }
        connection.query(`UPDATE employee 
        SET role_id = ${roleId}
        WHERE employee.id = ${employeeId.name}`, async (err, res) => {
            if (err) throw err;
            console.log('Role has been updated..')
            viewEmp();
        });
    });
}



// const updateRole = () => {
//     console.log("Time to update the files here");
//     connection.query("SELECT * FROM employee", (err, data) => {
//         if (err) throw err;
//         inquirer
//             .prompt([
//                 {
//                     name: "employeeName",
//                     type: "list",
//                     message: "Which employee's role is changing?",
//                     choices: function () {
//                         employeeArray = [];
//                         data.forEach(data => {
//                             employeeArray.push(
//                                 data.last_name
//                             );
//                         })
//                         return employeeArray;
//                     }
//                 }
//         ])
//         .then((answer) => {
//             const chosenName = answer.employeeName;
//             connection.query("SELECT * FROM role", (err, res) => {
//                 if (err) throw err;
//                 inquirer
//                 .prompt ([
//                     {
//                         name: "role",
//                         type: "list",
//                         message: "What is their new role?",
//                         choices: function() {
//                             rolesArray = [];
//                             res.forEach(res => {
//                                 rolesArray.push(
//                                     res.title
//                                 );
//                             })
//                             return rolesArray;
//                         }
//                     }
//                 ])
//                 .then((rolesAns) => {
//                     const newRole = rolesAns.role;
//                     connection.query("SELECT * FROM role WHERE title = ?",[newRole],(err, data) => {
//                         if (err) throw err;
//                         let roleID = res.id;
//                         let query = "UPDATE employee SET role_id ? WHERE last_name ?";
//                         let values = [roleID, chosenName]
//                         connection.query(query, values, 
//                             function(err, res, fields) {

//                             })
//                             viewEmp();
//                     })
//                 })
//             })
//         })
//     });
// };