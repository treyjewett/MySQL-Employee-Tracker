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
        connection.query(query, function(err, res) {
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
        connection.query(query, function(err, res) {
            console.table(res);
            initialAction();
        });
    } catch (err) {
        console.log(err);
        initialAction();
    }
}

const employeeAdd = async () => {
    try{
        console.log('Employee Add');
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
                message: "What is this Employee's role id?",
                choices: ['1','2','3','4']
            },
            {
                name: 'employeeManagerId',
                type: 'rawlist',
                message: "What is this Employee's Manager's Id?",
                choices: ['1','2','3','4']
            }
        ])
        let result = await connection.query("INSERT INTO employee SET ?",{
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.employeeRoleId,
                    manager_id: answer.employeeManagerId
        });
        console.log('Employee added successfully!');
        initialAction();
    } catch (err) {
        console.log(err);
        initialAction();
    }
}

function departmentAdd() {
    console.log('Department Add');
}

function roleAdd() {
    console.log('Role Add');
}

function employeeUpdate() {
    console.log('Employee Update');
}