// const db = require('./db/connection.js');
// const consoletable = require('console.table');
const inquirer = require('inquirer');

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
else if (response.menu === 'update a department') {
    updateDepartment();
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
// function start() {
//     inquirer
//         .prompt(menu)
//         .then(response => {
//             console.log(response)
            
//         })
// }
// start();