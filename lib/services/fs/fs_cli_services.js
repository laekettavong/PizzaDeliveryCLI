
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

    static getOrderById(orderId) {
        FsHelper.read(Constants.ORDERS, orderId, (err, orderData) => {
            if(!err && orderData) {
                CliUtils.verticalSpace();
                console.log(JSON.stringify(orderData, null, 3));
                CliUtils.verticalSpace();
            }
        });
    }

    static getTotalOrders(hrsOffset) {
        CliServices.fetchOrders(hrsOffset, (err, orderData) => {
            if(!err && orderData){
                let totalAmount = 0;
                orderData.forEach((order) => {
                    totalAmount += Currency.getDollarValue(order.total);
                });
                console.log(`Total: \x1b[33m${Currency.USD(totalAmount)}\x1b[0m `);
            }
        });
    }

    static getHighestOrder(hrsOffset) {
        CliServices.fetchOrders(hrsOffset, (err, orderData) => {
            if(!err && orderData){
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
            if(!err && orderData){
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