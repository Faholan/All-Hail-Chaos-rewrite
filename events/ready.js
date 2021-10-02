const chalk = require('chalk');

// Make the `ready` event handler
const ready = client => {
    // Log the event
    console.log(chalk.green('Ready.'));
}

module.exports = ready;
