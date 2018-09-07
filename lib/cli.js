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

            // If no match is found, tell the user to try again
            if(!matchFound) {
                console.log('Invalid command, refer to help page');
                CliResponders.help();
            }
        }
    }
}

const CliResponders = class CliResponders {
    static help() {
        // Show the header for the help pge that is as wid as tje screen
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

    static exit() {
        process.exit(0);
    }

    static displayMenu() {
        CliServices.displayMenu();
    }

    static displayOrders(userInput) {
        CliServices.displayOrders(CliResponders.getHourOffset(userInput));
    }

    static displayMoreOrderInfo(userInput) {
        CliServices.displayOrderById( this.getParamValue(userInput));
    }

    static displayUsers(userInput) {
        CliServices.displayUsers(CliResponders.getHourOffset(userInput));
    }

    static displayUserById(userInput) {
        CliServices.displayUserById(CliResponders.getParamValue(userInput));
    }

    static displayTotalSales(userInput) {
        CliServices.displayTotalSales(CliResponders.getHourOffset(userInput));
    }

    static displayHighestOrder(userInput) {
        CliServices.displayHighestOrder(CliResponders.getHourOffset(userInput));
    }

    static displayLowestOrder(userInput) {
        CliServices.displayLowestOrder(CliResponders.getHourOffset(userInput));
    }

    static displayOrdersMedian(userInput) {
        CliServices.displayOrdersMedian(CliResponders.getHourOffset(userInput));
    }

    static displaySalesMetrics(userInput) {
        CliServices.displaySalesMetrics(CliResponders.getHourOffset(userInput));
    }

    static displayPizzaMetrics(userInput) {
        CliServices.displayPizzaMetrics(CliResponders.getHourOffset(userInput));
    }

    static displayWingsMetrics(userInput) {
        CliServices.displayWingsMetrics(CliResponders.getHourOffset(userInput));
    }
     
    static displayBreadsticksMetrics(userInput) {
        CliServices.displayBreadsticksMetrics(CliResponders.getHourOffset(userInput));
    }
     
    static displaySodaMetrics(userInput) {
        CliServices.displaySodaMetrics(CliResponders.getHourOffset(userInput));
    }
    
    static getHourOffset(userInput) {
        let arr = userInput.split('--');
        let hourOffset = 24;
        if(arr.length > 0 && StringHelper.isValidString(arr[1])) {
            try{
                hourOffset = Number.parseInt(StringHelper.isValidString(arr[1]))
            } catch(err) {
                console.log("Error parsing user input - offset hours", err);
            }
        }
        return hourOffset
    }

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
        console.log("PARAM", paramVal)
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