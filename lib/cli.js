const readline = require('readline');
const CliServices = require('./services/fs/fs_cli_services');
const CliUtils = CliServices.CliUtils;
const events = require('events');
class _event extends events{};
const EventEmitter = new _event();
const Constants = require('./constants');
const Colors = Constants.Colors;
const CliCommandArray = Constants.CliCommandArray;
const CliMap = Constants.CliMap;
const Utils = require('./utils');
const StringHelper = Utils.StringHelper;
const Config = require('./config');


const CliClient = class CliClient {

    static init() {
        // Send the start message to the console. in dark blue
        console.log(Colors.DARK_BLUE, 'The CLI is running');
        
        // Start the interface
        let client = readline.createInterface({
            input : process.stdin,
            output : process.stdout,
            prompt : ''
        });

        // Create an initial prompt
        client.prompt();

        // Handle each line of the input separately
        client.on('line', (userInput) => {
            // Send to the input processor
            CliClient.processInput(userInput);

            // Re-initialize the prompt fterwards
            client.prompt();
        });

        // If the user stops the CLI, kill the associated process
        client.on('close', (userInput) => {
            process.exit(0);
        });
    }
    /*
    * Processes the cli user input
    * 
    * @param {userInput}
    * 
    */
    static processInput(userInput){
        userInput = StringHelper.isValidString(userInput);

        // Only process the input if the user actually wrote something, other wise ignore it 
        if(userInput) {
            // Go through the possible inputs, emit an event when a match is found
            let matchFound = false;
            CliCommandArray.some((command) => {
                if(userInput.toLowerCase().indexOf(command) > -1){
                    matchFound = true;
                    // Emit an event matching the unique inout, and include the full string gicen by teh user
                    EventEmitter.emit(command, userInput);
                    return true;
                }
            });

            // If no match is found, show the help page
            if(!matchFound) {
                console.log('Invalid command, refer to help page');
                CliResponders.help();
            }
        }
    }
}

const CliResponders = class CliResponders {

    /*
    * Displays the help/man page
    * 
    */
    static help() {
        // Show the header for the help page that is as wide as the screen
        CliUtils.horizontalLine();
        CliUtils.centered('CLI MANUAL');
        CliUtils.horizontalLine();
        CliUtils.verticalSpace(1);

        CliMap.forEach((value, key) => {
            let line = `\x1b[33m${key}\x1b[0m`;
            let padding = 60 - line.length;
            for(let i = 0; i < padding; i++){
                line += ' ';
            }
            line += value;
            console.log(line);
        });
        CliUtils.verticalSpace(1);
    }

    /*
    * Exits the command prompt and the application
    * 
    */
    static exit() {
        process.exit(0);
    }

    /*
    * Displays the pizzeria menu items
    * 
    */
    static displayMenu() {
        CliServices.displayMenu();
    }

    /*
    * Displays all the orders place within the specified previous hours.
    * Defaults to 24 hours if not specified
    * 
    * @param {userInput}
    * 
    */
    static displayOrders(userInput) {
        CliServices.displayOrders(CliResponders.getHourOffset(userInput));
    }

    /*
    * Displays more details of the specified order
    * 
    * @param {userInput}
    * 
    */
    static displayMoreOrderInfo(userInput) {
        CliServices.displayOrderById( this.getParamValue(userInput));
    }

    /*
    * Displays all the users registered with system within the specified previous hours.
    * Defaults to 24 hours if not specified
    * 
    * @param {userInput}
    * 
    */
    static displayUsers(userInput) {
        CliServices.displayUsers(CliResponders.getHourOffset(userInput));
    }

     /*
    * Displays more details on the specified user
    * 
    * @param {userInput}
    * 
    */
    static displayUserById(userInput) {
        CliServices.displayUserById(CliResponders.getParamValue(userInput));
    }

    /*
    * Displays all the total sales within the specified previous hours.
    * Defaults to 24 hours if not specified
    * 
    * @param {userInput}
    * 
    */
    static displayTotalSales(userInput) {
        CliServices.displayTotalSales(CliResponders.getHourOffset(userInput));
    }

    /*
    * Displays the highest order total within the specified previous hours.
    * Defaults to 24 hours if not specified
    * 
    * @param {userInput}
    * 
    */
    static displayHighestOrder(userInput) {
        CliServices.displayHighestOrder(CliResponders.getHourOffset(userInput));
    }

    /*
    * Displays the lowest order total within the specified previous hours.
    * Defaults to 24 hours if not specified
    * 
    * @param {userInput}
    * 
    */
    static displayLowestOrder(userInput) {
        CliServices.displayLowestOrder(CliResponders.getHourOffset(userInput));
    }

    /*
    * Displays the media order total within the specified previous hours.
    * Defaults to 24 hours if not specified
    * 
    * @param {userInput}
    * 
    */
    static displayOrdersMedian(userInput) {
        CliServices.displayOrdersMedian(CliResponders.getHourOffset(userInput));
    }

    /*
    * Displays all sales metrics within the specified previous hours.
    * Defaults to 24 hours if not specified
    * 
    * @param {userInput}
    * 
    */
    static displaySalesMetrics(userInput) {
        CliServices.displaySalesMetrics(CliResponders.getHourOffset(userInput));
    }

    /*
    * Displays all pizza sales metrics within the specified previous hours.
    * Defaults to 24 hours if not specified
    * 
    * @param {userInput}
    * 
    */
    static displayPizzaMetrics(userInput) {
        CliServices.displayPizzaMetrics(CliResponders.getHourOffset(userInput));
    }

    /*
    * Displays all chicken wings sales metrics within the specified previous hours.
    * Defaults to 24 hours if not specified
    * 
    * @param {userInput}
    * 
    */
    static displayWingsMetrics(userInput) {
        CliServices.displayWingsMetrics(CliResponders.getHourOffset(userInput));
    }
    
    /*
    * Displays all breadsticks sales metrics within the specified previous hours.
    * Defaults to 24 hours if not specified
    * 
    * @param {userInput}
    * 
    */
    static displayBreadsticksMetrics(userInput) {
        CliServices.displayBreadsticksMetrics(CliResponders.getHourOffset(userInput));
    }
 
    /*
    * Displays all soda sales metrics within the specified previous hours.
    * Defaults to 24 hours if not specified
    * 
    * @param {userInput}
    * 
    */
    static displaySodaMetrics(userInput) {
        CliServices.displaySodaMetrics(CliResponders.getHourOffset(userInput));
    }

    /*
    * Determines the hour offset for lookups else use the default value
    * 
    * @param {userInput}
    * 
    */
    static getHourOffset(userInput) {
        let arr = userInput.split('--');
        let hourOffset = Config.hourOffset;
        if(arr.length > 0 && StringHelper.isValidString(arr[1])) {
            try{
                hourOffset = Number.parseInt(StringHelper.isValidString(arr[1]))
            } catch(err) {
                console.log("Error parsing user input - offset hours", err);
            }
        }
        return hourOffset
    }

    /*
    * Determines the parameter value - i.e. orerId, userId, etc.
    * 
    * @param {userInput}
    * 
    */
    static getParamValue(userInput) {
        let arr = userInput.split('--');
        let paramVal = '';
        if(arr.length > 0 && StringHelper.isValidString(arr[1])) {
            try{
                paramVal = StringHelper.isValidString(arr[1]);
            } catch(err) {
                console.log("Error parsing user input - param value", err);
            }
        }
        return paramVal
    }
}

EventEmitter.on('man', (userInput) => {
    CliResponders.help();
});

EventEmitter.on('help', (userInput) => {
    CliResponders.help();
});

EventEmitter.on('exit', (userInput) => {
    CliResponders.exit();
});

EventEmitter.on('menu', (userInput) => {
    CliResponders.displayMenu();
});

EventEmitter.on('list orders', (userInput) => {
    CliResponders.displayOrders(userInput);
});

EventEmitter.on('more order info', (userInput) => {
    CliResponders.displayMoreOrderInfo(userInput);
});

EventEmitter.on('list users', (userInput) => {
    CliResponders.displayUsers(userInput);
});

EventEmitter.on('more user info', (userInput) => {
    CliResponders.displayUserById(userInput);
});

EventEmitter.on('get sales total', (userInput) => {
    CliResponders.displayTotalSales(userInput);
});

EventEmitter.on('get highest total', (userInput) => {
    CliResponders.displayHighestOrder(userInput);
});

EventEmitter.on('get lowest total', (userInput) => {
    CliResponders.displayLowestOrder(userInput);
});

EventEmitter.on('get median total', (userInput) => {
    CliResponders.displayOrdersMedian(userInput);
});

EventEmitter.on('list sales metrics', (userInput) => {
    CliResponders.displaySalesMetrics(userInput);
});

EventEmitter.on('list pizza metrics', (userInput) => {
    CliResponders.displayPizzaMetrics(userInput);
});

EventEmitter.on('list wings metrics', (userInput) => {
    CliResponders.displayWingsMetrics(userInput);
});

EventEmitter.on('list breadsticks metrics', (userInput) => {
    CliResponders.displayBreadsticksMetrics(userInput);
});

EventEmitter.on('list soda metrics', (userInput) => {
    CliResponders.displaySodaMetrics(userInput);
});

module.exports = CliClient;