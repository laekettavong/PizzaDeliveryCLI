
const MenuHelper = require('./../../menu_helper');
const FsHelper = require('./fs_helper');
const Constants = require('./../../constants');
const Utils = require('./../../utils');
const StringHelper = Utils.StringHelper;
const Currency = Utils.Currency;

const CliServices = class CliServices {
    static getMenu() {
        return console.dir(MenuHelper.constructMenu(), {colors : true});
    }

    static fetchOrders(hrsOffset, callback) {
        FsHelper.list(Constants.ORDERS, (err, orderIds) => {
            if(!err && orderIds && orderIds.length > 0) {
                hrsOffset = !StringHelper.isValidNumber(hrsOffset) ? 24 : hrsOffset;
                let indx = 0;
                let orderArray = [];
                orderIds.forEach((orderId) => {
                    FsHelper.read(Constants.ORDERS, orderId, (err, orderData) => {
                        if(!err && orderData) {
                            let cutOffDate = new Date();
                            cutOffDate.setHours(cutOffDate.getHours() - hrsOffset);
                            let createDate = new Date(orderData.date)
                            indx++;
                            if(createDate >= cutOffDate) {
                                orderArray.push(orderData);
                            }
                            if(indx == orderIds.length)  {
                                callback(false, orderArray);
                            }   
                        }
                    });
                });
            }
        });
    }

    static getOrders(hrsOffset) {
        CliServices.fetchOrders(hrsOffset, (err, orderData) => {
            if(!err && orderData){
                let totalAmount = 0;
                orderData.forEach((order) => {
                    let createDate = new Date(order.date)
                    let line = `ID: \x1b[33m${order.id}\x1b[0m   Customer: ${order.email}  Total: ${order.total}   Date: ${createDate.toDateString()} ${createDate.toTimeString()}`;
                    console.log(line);
                    CliUtils.verticalSpace();
                });
            }
        });
    }

    static getPizzaMetrics(hrsOffset) {
        CliServices.fetchOrders(hrsOffset, (err, orderData) => {
            if(!err && orderData && orderData.length > 0) {
                let pizzaArray = [];
                orderData.forEach((order) => {
                    if(order.items.pizzas.length > 0) {
                        order.items.pizzas.forEach((orderedPizza) => {
                            let targetPizza = pizzaArray.filter(pizza => pizza.type.toLowerCase() === orderedPizza.type.toLowerCase());
                            if(targetPizza && targetPizza.length > 0) {
                                targetPizza[0].qty += orderedPizza.qty;
                            } else {
                                pizzaArray.push({'type' : StringHelper.capitalizeAllFirstLetter(orderedPizza.type), 'qty' : orderedPizza.qty})
                            }
                        });
                    }
                });

                // Sort pizza count in descending order
                pizzaArray = pizzaArray.sort((a, b) => (a.qty < b.qty ? 1 : -1));

                CliUtils.verticalSpace(1);
                pizzaArray.forEach((pizza) => {
                    console.log(`Pizza type: \x1b[33m${pizza.type}\x1b[0m   Qty: \x1b[33m${pizza.qty}\x1b[0m `);
                });
                CliUtils.verticalSpace(1);
            }
        });
    }

    static getWingsMetrics(hrsOffset) {
        CliServices.fetchOrders(hrsOffset, (err, orderData) => {
            if(!err && orderData && orderData.length > 0) {
                let wingsArray = [];
                orderData.forEach((order) => {
                    if(order.items.wings.length > 0) {
                        order.items.wings.forEach((orderedWings) => {
                            let targetWings = wingsArray.filter(wings => wings.seasoning.toLowerCase() === orderedWings.seasoning.toLowerCase());
                            if(targetWings && targetWings.length > 0) {
                                targetWings[0].qty += orderedWings.qty;
                            } else {
                                wingsArray.push({'seasoning' : StringHelper.capitalizeAllFirstLetter(orderedWings.seasoning), 'qty' : orderedWings.qty})
                            }
                        });
                    }
                });

                // Sort wings count in descending order
                wingsArray = wingsArray.sort((a, b) => (a.qty < b.qty ? 1 : -1));

                CliUtils.verticalSpace(1);
                wingsArray.forEach((wings) => {
                    console.log(`Check wings seasoning: \x1b[33m${wings.seasoning}\x1b[0m   Qty: \x1b[33m${wings.qty}\x1b[0m`);
                });
                CliUtils.verticalSpace(1);
            }
        });
    }

    static getBreadsticksMetrics(hrsOffset) {
        CliServices.fetchOrders(hrsOffset, (err, orderData) => {
            if(!err && orderData && orderData.length > 0) {
                let sticksArray = [];
                orderData.forEach((order) => {
                    if(order.items.breadsticks.length > 0) {
                        order.items.breadsticks.forEach((orderedSticks) => {
                            let targetSticks = sticksArray.filter(sticks => sticks.seasoning.toLowerCase() === orderedSticks.seasoning.toLowerCase());
                            console.log(orderedSticks.seasoning, orderedSticks.qty, order.date, order.id);
                            if(targetSticks && targetSticks.length > 0) {
                                targetSticks[0].qty += orderedSticks.qty;
                            } else {
                                sticksArray.push({'seasoning' : StringHelper.capitalizeAllFirstLetter(orderedSticks.seasoning), 'qty' : orderedSticks.qty})
                            }
                        });
                    }
                });

                // Sort breadsticks count in descending order
                sticksArray = sticksArray.sort((a, b) => (a.qty < b.qty ? 1 : -1));

                CliUtils.verticalSpace(1);
                sticksArray.forEach((breadsticks) => {
                    console.log(`Breadsticks seasoning: \x1b[33m${breadsticks.seasoning}\x1b[0m   Qty: \x1b[33m${breadsticks.qty}\x1b[0m`);
                });
                CliUtils.verticalSpace(1);
            }
        });
    }

    static getSodaMetrics(hrsOffset) {
        CliServices.fetchOrders(hrsOffset, (err, orderData) => {
            if(!err && orderData && orderData.length > 0) {
                let sodaArray = [];
                orderData.forEach((order) => {
                    if(order.items.sodas.length > 0) {
                        order.items.sodas.forEach((orderedSoda) => {
                            let targetSoda = sodaArray.filter(soda => soda.flavor.toLowerCase() === orderedSoda.flavor.toLowerCase());
                            //console.log(orderedSoda.seasoning, orderedSoda.qty, order.date, order.id);
                            if(targetSoda && targetSoda.length > 0) {
                                targetSoda[0].qty += orderedSoda.qty;
                            } else {
                                sodaArray.push({'flavor' : StringHelper.capitalizeAllFirstLetter(orderedSoda.flavor), 'qty' : orderedSoda.qty})
                            }
                        });
                    }
                });

                // Sort soda count in descending order
                sodaArray = sodaArray.sort((a, b) => (a.qty < b.qty ? 1 : -1));

                CliUtils.verticalSpace(1);
                sodaArray.forEach((soda) => {
                    console.log(`Soda flavor: \x1b[33m${soda.flavor}\x1b[0m   Qty: \x1b[33m${soda.qty}\x1b[0m`);
                });
                CliUtils.verticalSpace(1);
            }
        });
    }

    static getOrderById(orderId) {
        FsHelper.read(Constants.ORDERS, orderId, (err, orderData) => {
            if(!err && orderData) {
                CliUtils.verticalSpace();
                console.log(JSON.stringify(orderData, null, 3));
                CliUtils.verticalSpace();
            }
        });
    }

    static getOrdersTotal(hrsOffset) {
        CliServices.fetchOrders(hrsOffset, (err, orderData) => {
            if(!err && orderData && orderData.length > 0) {
                let totalAmount = 0;
                orderData.forEach((order) => {
                    totalAmount += Currency.getDollarValue(order.total);
                });
                console.log(`Total sale: \x1b[33m${Currency.USD(totalAmount)}\x1b[0m `);
            }
        });
    }

    static getOrdersMedian(hrsOffset) {
        CliServices.fetchOrders(hrsOffset, (err, orderData) => {
            if(!err && orderData && orderData.length > 0) {
                let totalAmount = 0;
                orderData.forEach((order) => {
                    totalAmount += Currency.getDollarValue(order.total);
                });
                if(totalAmount > 0) {
                    totalAmount = totalAmount / orderData.length;
                }
                console.log(`Median sale: \x1b[33m${Currency.USD(totalAmount)}\x1b[0m `);
            }
        });
    }

    static getHighestOrder(hrsOffset) {
        CliServices.fetchOrders(hrsOffset, (err, orderData) => {
            if(!err && orderData && orderData.length > 0) {
                let highestAmount = 0;
                let highestOrders = [];
                orderData.forEach((order) => {
                    if(Currency.getDollarValue(order.total) >= highestAmount) {
                        highestAmount = Currency.getDollarValue(order.total);
                        if(highestOrders.length > 0 && Currency.getDollarValue(highestOrders[0].total) < highestAmount){
                            highestOrders = [];
                        }
                        highestOrders.push(order);
                    }
                });

                CliUtils.verticalSpace();
                highestOrders.forEach((order) => {
                    console.log(`Highest order: \x1b[33m${order.id}\x1b[0m   User: ${order.email}   Amount: ${order.total} `);
                });
                CliUtils.verticalSpace();
            }
        });
    }

    static getLowestOrder(hrsOffset) {
        CliServices.fetchOrders(hrsOffset, (err, orderData) => {
            if(!err && orderData && orderData.length > 0) {
                let lowestAmount = 100000;
                let lowestOrders = [];
                orderData.forEach((order) => {
                    if(Currency.getDollarValue(order.total) <= lowestAmount) {
                        lowestAmount = Currency.getDollarValue(order.total);
                        if(lowestOrders.length > 0 && Currency.getDollarValue(lowestOrders[0].total) > lowestAmount){
                            lowestOrders = [];
                        }
                        lowestOrders.push(order);
                    }
                });
                CliUtils.verticalSpace();
                lowestOrders.forEach((order) => {
                    console.log(`Lowest order: \x1b[33m${order.id}\x1b[0m   User: ${order.email}   Amount: ${order.total} `);
                });
                CliUtils.verticalSpace();
            }
        });
    }

    static getUsers(hrsOffset) {
        FsHelper.list(Constants.USERS, (err, userId) => {
            if(!err && userId && userId.length > 0) {
                CliUtils.verticalSpace();
                hrsOffset = !StringHelper.isValidNumber(hrsOffset) ? 24 : hrsOffset;
                userId.forEach((userId) => {
                    FsHelper.read(Constants.USERS, userId, (err, userData) => {
                        if(!err && userData) {
                            let cutOffDate = new Date();
                            cutOffDate.setHours(-hrsOffset);
                            let createDate = new Date(userData.created)
                            if(createDate >= cutOffDate) {
                                let line = `ID: \x1b[33m${userData.email}\x1b[0m   Name: ${userData.firstName} ${userData.lastName}   Address: ${userData.address}   City: ${userData.city}   State: ${userData.state}   Orders: ${userData.orderhistory}`;
                                console.log(line);
                                CliUtils.verticalSpace();
                            }
                        }
                    });
                });
            }
        });
    }

    static getUserById(userId) {
        FsHelper.read(Constants.USERS, userId, (err, userData) => {
            if(!err && userData) {
                delete userData.hashedPassword;
                let createDate = new Date(userData.created);
                userData.created = `${createDate.toDateString()} ${createDate.toTimeString()}`;
                CliUtils.verticalSpace(3);
                console.log(JSON.stringify(userData, null, 3));
                CliUtils.verticalSpace(3);
            }
        });
    }
}

const CliUtils = class CliUtils {
    static horizontalLine() {
        // Get the available screen size
        let width = process.stdout.columns;
        let line = '';
        for(let i = 0; i < width; i++) {
            line += '-';
        }
        console.log(line);
    }

    static center(str) {
        str = StringHelper.isValidStringDefaultToEmpty(str);
        // Get the available screen size
        let width = process.stdout.columns;

        // Calculate the keft padding there should be
        let leftPadding = Math.floor((width - str.length) / 2);

        // Put in left padded space befoe he string itself
        let line = '';
        for(let i = 0; i < leftPadding; i++){
            line += ' ';
        }
        line += str;
        console.log(line);
    }

    static verticalSpace(lines) {
        lines = StringHelper.isValidNumber(lines, 1);
        for(let i = 0; i < lines; i++) {
            console.log('');
        }
    }
}

module.exports = CliServices;