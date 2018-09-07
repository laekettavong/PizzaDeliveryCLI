const crypto = require('crypto');
const Constants = require('./constants');
const Config = require('./config');
const FsHelper = require('./services/fs/fs_helper');

const StringHelper = class StringHelper {
    static isTypeOfString(dataType) {
        return typeof(dataType) === 'string';
    }

    static isTypeOfNumber(dataType) {
        return typeof(dataType) === 'number';
    }

    static isTypeOfBoolean(dataType) {
        return typeof(dataType) === 'boolean';
    }

    static isTypeOfObject(dataType) {
        return typeof(dataType) === 'object';
    }

    static isValidString(str, maxLength) {
        if(maxLength){
            return this.isTypeOfString(str) && str.trim().length > 0 && str.trim().length <= maxLength ? str : false; 
        } else {
            return this.isTypeOfString(str) && str.trim().length > 0 ? str : false;
        }
    }

    static isValidStringDefaultToEmpty(str) {
        return this.isTypeOfString(str) && str.trim().length > 0 ? str.trim() : '';
    }

    static isValidBoolean(bool) {
        return this.isTypeOfBoolean(bool) && bool ? bool : false;
    }

    static isValidNumber(num) {
        return this.isTypeOfNumber(num) && num > 0 ? num : false;
    }

    static isValidEmail(email) {
        // Regex not very robust but will do for now
        return email && email.trim().match(/@.*\.(com|gov|edu|net|org)$/i) ? email : false;
    }

    static isValidStringPhoneNumber(numStr) {
        return this.isTypeOfString(numStr) && numStr.trim().length === 10 ? numStr : false;
    }

    static isValidProtocol(protocol) {
        return this.isTypeOfString(protocol) && Constants.REQUEST_PROTOCOLS.includes(protocol.toLowerCase()) ? protocol : false;
    }

    static isValidMethod(method) {
        return this.isTypeOfString(method) && Constants.REQUEST_METHODS.includes(method.toLowerCase()) ? method : false;
    }

    static isValidObject(obj) {
        return this.isTypeOfObject(obj) && obj !== null ? obj : {};
    }

    static capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static capitalizeAllFirstLetter(str) {
        if(str) {
            let strArray =  str.split(" ");
            let capital = [];
            for(let str of strArray) {
                capital.push(str[0].toUpperCase() + str.substr(1));
            }
            return capital.join(" ");
        }
        return str;
    }

    static replaceWhiteSpace(str, newChar) {
        if(str) {
            return str.replace(/\W/gi, newChar);
        }
        return str;
    }
}

const Currency = class Currency {
    static USD(amount){
        if(StringHelper.isValidNumber(amount)){
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
        } else {
            return 0;
        }
    }

    static getDollarValue(amountStr) {
        if(StringHelper.isValidNumber(amountStr)) {
            return amountStr;
        } else {
            try {
                return Number.parseFloat(amountStr.substr(1));
            } catch(err) {
                return 0;
            }
        }
    }
}

const RandomGenerator = class RandomGenerator {
    static generateString(strLength){
        if(StringHelper.isValidNumber(strLength)){
            let randomStr = '';
            let counter = 0;
            while(counter < strLength){
                randomStr += Constants.ALL_CHARACTERS.charAt(Math.floor(Math.random() * Constants.ALL_CHARACTERS.length));
                counter++;
            }
            return randomStr;
        } else {
            return false;
        }
    }
}

const JSONHelper = {
    convertToObject : (jsonStr) => {
        try {
            return JSON.parse(jsonStr);
        } catch(err) {
            return {};
        }
    }
}

const ArrayHelper = {
    isNotEmptyArray : (array) => {
        return typeof(array) == 'object' && array instanceof Array && array.length > 0 ? array : false;
    },
    spliceStringFromElements : (targetArray, stringToRemove) => {
        let retArray = [];
        targetArray.forEach((elem) => {
            if(elem !== '.gitkeep') { // disregard .gitkeep file
                retArray.push(elem.replace(stringToRemove, ''));
            }
        })
        return retArray;
    },
    getArray : (array) => {
        return typeof(array) == 'object' && array instanceof Array && array.length > 0 ? array : [];
    },
}

const AuthHelper = {
    hash : (str) => {
        if(StringHelper.isValidString(str)){
            return crypto.createHmac('sha256', Config.hashingSecret).update(str).digest('hex');
        } else {
            return false;
        }
    },
    isAuthenticated : (incomingPassword, storedPassword) => {
        if(StringHelper.isValidString(incomingPassword)
        && StringHelper.isValidString(storedPassword)){
            return incomingPassword == storedPassword;
        } else {
            return false;
        }
    }
}

const TokenHelper = {
    verifyToken : (id, email, callback) => {
        FsHelper.read(Constants.TOKENS, id, (err, tokenData) => {
            if(!err && tokenData){
                if(tokenData.email == email && tokenData.expires > Date.now()){
                    callback(true);
                } else {
                    callback(false);
               }
            } else {
                callback(false);
            }
        })
    },
    getToken : (id, callback) => {
        FsHelper.read(Constants.TOKENS, id, (err, tokenData) => {
            if(!err && tokenData){
                callback(false, tokenData);
            } else {
                callback(500, {Error : 'Could not find token'});
            }
        });
    }
}

module.exports.StringHelper = StringHelper;
module.exports.Currency = Currency;
module.exports.RandomGenerator = RandomGenerator;
module.exports.JSONHelper = JSONHelper;
module.exports.ArrayHelper = ArrayHelper;
module.exports.AuthHelper = AuthHelper;
module.exports.TokenHelper = TokenHelper;