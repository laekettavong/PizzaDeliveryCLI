
const MenuHelper = require('./../../menu_helper');
const FsHelper = require('./fs_helper');
const Constants = require('./../../constants');
const Utils = require('./../../utils');
const StringHelper = Utils.StringHelper;

const CliServices = class CliServices {
    static getMenu() {
        return console.dir(MenuHelper.constructMenu(), {colors : true});
    }

    static getOrders(hrsOffset) {
        FsHelper.list(Constants.ORDERS, (err, orderIds) => {
            if(!err && orderIds && orderIds.length > 0) {
                CliUtils.verticalSpace();
                hrsOffset = !StringHelper.isValidNumber(hrsOffset) ? 24 : hrsOffset;
                orderIds.forEach((orderId) => {
                    FsHelper.read(Constants.ORDERS, orderId, (err, orderData) => {
                        let offsetDate = new Date();
                        offsetDate.setHours(-hrsOffset);
                        let orderDate = new Date(orderData.date)
                        if(orderDate >= offsetDate) {
                            let line = `ID: \x1b[33m${orderId}\x1b[0m   Customer: ${orderData.email}  Total: ${orderData.total}   Date: ${orderDate.toDateString()} ${orderDate.toTimeString()}`;
                            console.log(line);
                            CliUtils.verticalSpace();
                        }
                    });
                });
            }
        })
    }

    static getOrderById(orderId) {
        FsHelper.read(Constants.ORDERS, orderId, (err, orderData) => {
            if(!err && orderData) {
                CliUtils.verticalSpace(3);
                console.log(JSON.stringify(orderData, null, 3));
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