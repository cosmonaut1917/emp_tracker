// const db = require('./db/connection.js');
// const consoletable = require('console.table');
const inquirer = require('inquirer');
const db = require('./db/connection');
const { up } = require('inquirer/lib/utils/readline');
// list of menu options for user to interact with
const menu = [
    {
        name: 'menu',
        type: 'list',
        message: 'what would you like to find?',
        choices: [
            "view depts",
            'view all roles',
            'view all employees',
            'add role',
            'add an employee',
            'add a department',
            'update an employee role',
            'update a department',
            'delete a role',
            'delete an employee',
            'quit'
        ],

    }
];
// main menu function that prompts the user to select an option
function mainMenu() {
   inquirer.prompt(menu).then(response => {
   if (response.menu === 'view depts') {
    viewDepts();
}
else if (response.menu === 'view all roles') {
    viewRoles();
}
else if (response.menu === 'view all employees') {
    viewEmployees();
}
else if (response.menu === 'add role') {
    addRole();
}
else if (response.menu === 'add an employee') {
    addAnEmployee();
}
else if (response.menu === 'add a department') {
    addDepartment();
}
else if (response.menu === 'update an employee role') {
    updateEmployeeRole();
}
else if (response.menu === 'delete a role') {
    deleteRole();
}
else if (response.menu === 'delete an employee') {
    deleteEmployee();
}
else if (response.menu === 'quit') {
    quit();
}})
}
mainMenu();
function viewDepts() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log('viewing departments');
        console.table(results);
         mainMenu()
    });
    
   ;
}
function viewRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.log('viewing roles');
        console.table(results);
         mainMenu()
    });
    
}
function viewEmployees() {  
    db.query('SELECT * FROM employee', function (err, results) {
        console.log('viewing employees');
        console.table(results);
         mainMenu()
    });
    
}
function addRole() {
    db.query('SELECT * FROM department', function (err, results) {
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the role?'
            },
            {
                name: 'department_id',
                type: 'input',
                message: 'What is the department id of the role?'
            }
        ]).then(response => {
            db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',[response.title, response.salary, response.department_id], function (err, results) {
                console.log('adding a role');
                mainMenu();
            });
        });
    });
}
// adds an employee
function addAnEmployee() { 
inquirer.prompt([
    {
        name: 'first_name',
        type: 'input',
        message: 'What is the first name of the employee?'
    },
    {
        name: 'last_name',
        type: 'input',
        message: 'What is the last name of the employee?'
    },
    {
        name: 'role_id',
        type: 'input',
        message: 'What is the role id of the employee?'
    },
    {
        name: 'manager_id',
        type: 'input',
        message: 'What is the manager id of the employee?'
    }
]).then(response => {
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',[response.first_name, response.last_name, response.role_id, response.manager_id], function (err, results) {
        console.log('adding an employee');
        mainMenu();
    });
});
}
// adds a department
function addDepartment() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the department?'
        }
    ]).then(response => {
        db.query('INSERT INTO department (department_name) VALUES (?)',[response.name], function (err, results) {
            console.log('adding a department');
            mainMenu();
        });
    });
}
// updates the role of an employee
function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: 'employee_id',
            type: 'input',
            message: 'What is the employee id?'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'What is the role id?'
        }
    ]).then(response => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?',[response.role_id, response.employee_id], function (err, results) {
            console.log('updating an employee role');
            mainMenu();
        });
    });
}
quit = () => {
    process.exit();
}