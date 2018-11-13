var inquirer = require('inquirer');

const requireLetterAndNumber = value => {
    if (/\w/.test(value) && /\d/.test(value)) {
        return true;
    }
    return 'Password need to have at least a letter and a number';
};

inquirer
    .prompt([
        {
            type: 'input',
            name: 'website_name',
            message: "What's the website name? eg: My Awesome Website"
        },
        {
            type: 'input',
            name: 'website_domain',
            message: "What's the domain name? eg: myawesomewebsite.com"
        },
        {
            type: 'input',
            name: 'database_url',
            message: "What's the MySQL host? eg: localhost"
        },
        {
            type: 'input',
            name: 'database_name',
            message: "What would you like to call the database? eg: awesome_bloggle"
        },
        {
            type: 'input',
            name: 'database_username',
            message: "What's the database username? eg: tom"
        },
        {
            type: 'password',
            name: 'database_password',
            message: "What's the database password? eg: password123!",
            mask: '*',
            validate: requireLetterAndNumber
        }
    ])
    .then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
    });