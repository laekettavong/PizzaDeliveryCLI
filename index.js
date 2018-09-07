/*
* Entry file for API
*/

// Dependencies
const server = require('./lib/server');
const cliclient = require('./lib/cli');

// Declare the app
let app = {
    init : () => {
        server.init();

        // Start te CLI, but make sure it starts last
        setTimeout(() => {
            cliclient.init();
        }, 50);
    }
}

app.init();

// Export the app
module.exports = app;