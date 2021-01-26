const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const util = require('util');

// Create the connection to MySQL WorkBench
let connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'Kodaman21!',
    database: 'employee_DB'
});

connection.query = util.promisify(connection.query);

// Begin the application after establishing the connection.
connection.connect(function (err) {
    if (err) throw err;
    initialAction();
})

const initialAction = async () => {
    try {
        let answer = await inquirer.prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employees',
                'Add Departments',
                'Add Roles',
                'Update Employee Role',
                'Exit'
            ]
        });
        switch (answer.action) {
            case 'View Employees':
                employeeView();
                break;

            case 'View Departments':
                departmentView();
                break;

            case 'View Roles':
                roleView();
                break;

            case 'Add Employees':
                employeeAdd();
                break

            case 'Add Departments':
                departmentAdd();
                break

            case 'Add Roles':
                roleAdd();
                break

            case 'Update Employee Role':
                employeeUpdate();
                break

            case 'Exit':
                connection.end();
                break;
        };
    } catch (err) {
        console.log(err);
        initialAction();
    };
}

const employeeView = async () => {
    console.log('Employee View');
    try {
        let query = 'SELECT * FROM employee';
        connection.query(query, function (err, res) {
            console.table(res);
            initialAction();
        });
    } catch (err) {
        console.log(err);
        initialAction();
    };
}

const departmentView = async () => {
    console.log('Department View');
    try {
        let query = 'SELECT * FROM department';
        connection.query(query, function (err, res) {
            console.table(res);
            initialAction();
        });
    } catch (err) {
        console.log(err);
        initialAction();
    };
}

const roleView = async () => {
    console.log('Role View');
    try {
        let query = 'SELECT * FROM role';
        connection.query(query, function (err, res) {
            console.table(res);
            initialAction();
        });
    } catch (err) {
        console.log(err);
        initialAction();
    };
}

const employeeAdd = async () => {
    try {
        console.log('Employee Add');
        let roles = await connection.query("SELECT * FROM role");
        let employee = await connection.query("SELECT * FROM employee");
        let answer = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the first name of this Employee?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the last name of this Employee?'
            },
            {
                name: 'employeeRoleId',
                type: 'rawlist',
                choices: function () {
                    let roleArray = [];
                    for (i = 0; i < roles.length; i++) {
                        roleArray.push(roles[i].id);
                    }
                },
                message: "What is this Employee's role id?"
            },
            {
                name: 'employeeManagerId',
                type: 'rawlist',
                choices: function () {
                    let managerArray = [];
                    for (i = 0; i < employee.length; i++) {
                        managerArray.push(employee[i].manager_id);
                    }
                },
                message: "What is this Employee's Manager's Id?"
            }
        ])

        let result = await connection.query("INSERT INTO employee SET ?", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: parseInt(answer.employeeRoleId),
            manager_id: parseInt(answer.employeeManagerId)
        });

        console.log(`${answer.firstName} ${answer.lastName} added successfully.\n`);
        
        initialAction();
    } catch (err) {
        console.log(err);
        initialAction();
    };
}

const departmentAdd = async () => {
    try {
        console.log('Department Add');
        let answer = await inquirer.prompt([
            {
                name: 'deptName',
                type: 'input',
                message: 'What is the name of your new department?'
            }
        ]);

        let result = await connection.query("INSERT INTO department SET ?", {
            department_name: answer.deptName
        });

        console.log(`${answer.deptName} added successfully to departments.\n`)

        initialAction();
    } catch (err) {
        console.log(err);
        initialAction();
    };
}

const roleAdd = async () => {
    try {
        let departments = await connection.query("SELECT * FROM department")
        console.log('Role Add');
        let answer = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the name of your new role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What salary will this role provide?'
            },
            {
                name: 'departmentId',
                type: 'rawlist',
                choices: function () {
                    let choiceArray = [];
                    for (i = 0; i < departments.length; i++) {
                        choiceArray.push(departments[i].department_id);
                    }
                    return choiceArray;
                },
                message: 'What department ID is this role associated with?',
            }
        ]);
        
        let chosenDepartment;
        for (i = 0; i < departments.length; i++) {
            if(department[i].department_id === answer.choice) {
                chosenDepartment = departments[i];
            };
        }


    } catch (err) {
        console.log(err);
        initialAction();
    };
}

const employeeUpdate = async () => {
    try {
        console.log('Employee Update');
        console.log('Updating Employee.\n');
        let answer = await inquirer.prompt([
        ]);
    } catch (err) {
        console.log(err);
        initialAction();
    };
}