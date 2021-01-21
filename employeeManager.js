const mysql = require('mysql');
const inquirer = require('inquirer');

// Create the connection to MySQL WorkBench
let connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'Kodaman21!',
    database: 'employee_DB'
});

// Begin the application after establishing the connection.
connection.connect(function(err) {
    if (err) throw err;
    runSearch();
})

runSearch = () => {
    console.log('Connection Made!');
}