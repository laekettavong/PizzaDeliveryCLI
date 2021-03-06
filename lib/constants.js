module.exports = {
    ALL_CHARACTERS : 'abcdefghijklmnopqrstuvwxyz0123456789',
    // Expected values
    REQUEST_METHODS : ['get', 'post', 'put', 'delete'],
    REQUEST_PROTOCOLS : ['https', 'http'],

    // Endpoints/data dirs
    USERS : 'users',
    TOKENS : 'tokens',
    CARTS : 'carts',
    ORDERS : 'orders',

    //Error messages
    ERROR_NO_POST_SUPPORT : 'This service does not support POST',
    ERROR_NO_GET_SUPPORT : 'This service does not support GET',
    ERROR_NO_PUT_SUPPORT : 'This service does not support PUT',
    ERROR_NO_DELETE_SUPPORT : 'This service does not support DELETE',
    ERROR_TOKEN_DOES_NOT_EXIST : 'Token does not exist',
    ERROR_CANNOT_PERFORM_OPERATION : 'Could not perform operation - invalid token',
    ERROR_MISSING_AUTH_TOKEN : 'Missing auth token',
    ERROR_CANNOT_FIND_TOKEN : 'Auth token not found',
    ERROR_MISSING_REQUIRED_FIELDS : 'Missing required fields',
    ERROR_CANNOT_CREATE_CONTEXT : 'Could not create user context',
    ERROR_CANNOT_FIND_CART : 'Could not find shopping cart',
    ERROR_CANNOT_CREATE_ORDER : 'Could not create order',
    ERROR_CANNOT_DELETE_CART : 'Could not delete shopping cart',
    ERROR_CANNOT_FIND_USER : 'Could not find user',
    ERROR_CANNOT_UPDATE_USER : 'Could not update user',
    ERROR_PAYMENT_FAILED : 'User payment failed',
    ERROR_CANNOT_SENT_NOTIFICATION : 'Could not send order confirmation email',
    ERROR_CANNOT_FIND_ORDER : 'Could not find order',
    ERROR_CANNOT_DELETE_USER : 'Could not delete user',
    ERROR_CANNOT_DELETE_ORDER : 'Could not delete order',
    ERROR_MISSING_FIELDS_TO_UPDATE : 'Missing fields to update',
    ERROR_MISSING_REQUIRED_USER_FIELDS : 'Missing required user fields',
    ERROR_USER_EXISTS : 'User already exists',
    ERROR_CANNOT_HASH_PASSWORD : 'Could not hash password',
    ERROR_CANNOT_CRETE_USER : 'Could not create user',
    ERROR_CANNOT_UPDATE_CART : 'Could not update shopping cart',
    ERROR_CART_EXISTS : 'Shopping cart already exists',
    ERROR_CANNOT_SAVE_CART : 'Could not save shopping cart',
    ERROR_TOKEN_EXPIRED : 'Token has expired',
    ERROR_CANNOT_UPDATE_TOKEN : 'Could not update auth token',
    ERROR_CANNOT_CONSTRUCT_MENU : 'Could not constuct menu',
    ERROR_AUTHENTICATION_FAILED : 'Authentication failed',
    ERROR_CLOSING_FILE : 'Error while closing file',
    ERROR_WRITING_TO_FILE : 'Error writing to file',
    ERROR_CANNOT_UPDATE_FILE : 'Could not open the file for updating, it may not exist yet',
    ERROR_DELETING_FILE : 'Error deleting file',
    ERROR_TRUNCATING_FILE : 'Error truncating file',
    ERROR_CANNOT_CREATE_FILE : 'Could not create new file, it may already exist',

    //Success
    SUCCESS_USER_DELETED : 'User deleted',
    SUCCESS_USER_UPDATED : 'User updated',
    SUCCESS_USER_CREATED : 'User created',
    SUCCESS_CART_DELETED : 'Shopping cart deleted',
    SUCCESS_CART_UPDATED : 'Shopping cart updated',
    SUCCESS_CART_SAVED : 'Shopping cart saved',
    SUCCESS_TOKEN_EXTENDED : 'Token expiration date extended',

    //Menu
    MENU_PIZZIA_NAME : 'Uncle Ralph\'s Pizzeria',
    MENU_PIZZA : 'Pizza',
    MENU_WINGS : 'Wings',
    MENU_BREADSTRICKS : 'Breadsticks',
    MENU_SODA : 'Soda',
}

module.exports.Colors = {
    RED : '\x1b[31m%s\x1b[0m',
    GREEN : '\x1b[32m%s\x1b[0m',
    YELLOW : '\x1b[33m%s\x1b[0m',
    DARK_BLUE: '\x1b[34m%s\x1b[0m',
    MAGENTA : '\x1b[35m%s\x1b[0m',
    LIGHT_BLUE: '\x1b[36m%s\x1b[0m'
}

const ImageMap = new Map();
ImageMap.set('breadsticks-butter', '/public/images/breadsticks1.jpg');
ImageMap.set('breadsticks-cheese', '/public/images/breadsticks2.jpg');
ImageMap.set('breadsticks-garlic', '/public/images/breadsticks3.jpg');
ImageMap.set('breadsticks-parmesan', '/public/images/breadsticks4.jpg');
ImageMap.set('soda-pepsi', '/public/images/drinks_pepsi.jpg');
ImageMap.set('soda-diet-pepsi', '/public/images/drinks_diet_pepsi.jpg');
ImageMap.set('soda-mountain-dew', '/public/images/drinks_mountain_dew.jpg');
ImageMap.set('soda-sierra-mist', '/public/images/drinks_sierra_mist.jpg');
ImageMap.set('wings-mild', '/public/images/chicken_wings1.jpg');
ImageMap.set('wings-hot', '/public/images/chicken_wings2.jpg');
ImageMap.set('wings-bbq', '/public/images/chicken_wings3.jpg');
ImageMap.set('wings-parmesan', '/public/images/chicken_wings4.jpg');
ImageMap.set('pizza-cheese', '/public/images/pizza_cheese.jpg');
ImageMap.set('pizza-hawaiian', '/public/images/pizza_hawaiian.jpg');
ImageMap.set('pizza-meatlovers', '/public/images/pizza_meatlovers.jpg');
ImageMap.set('pizza-old-world', '/public/images/pizza_old_world.jpg');
ImageMap.set('pizza-new-york-style', '/public/images/pizza_new_york_style.jpg');
ImageMap.set('pizza-pepperoni', '/public/images/pizza_pepperoni.jpg');
ImageMap.set('pizza-supreme', '/public/images/pizza_supreme.jpg');
ImageMap.set('pizza-veggie', '/public/images/pizza_veggie.jpg');

const CliMap = new Map();
CliMap.set('exit', 'Kill the CLI (and the rest of the application)');
CliMap.set('man','Show this help page');
CliMap.set('help','Alias of the "man" command');
CliMap.set('menu','Show current menu items');
CliMap.set('list orders --{hourOffset}','Show list of all orders within last specific hours (optional hourOffset is the last 24 hours if not specified)');
CliMap.set('more order info --{orderId}','Show details of a specific order');
CliMap.set('list users --{hourOffset}','Show list of all users registered within last specific hours (optional hourOffset is the last 24 hours if not specified)');
CliMap.set('more user info --{userId}','Show details of a specific user');
CliMap.set('get sales total --{hourOffset}','Show total sale within last specific hours (optional hourOffset is the last 24 hours if not specified)');
CliMap.set('get highest total --{hourOffset}','Show highest total order within last specific hours (optional hourOffset is the last 24 hours if not specified)');
CliMap.set('get median total --{hourOffset}','Show median total order within last specific hours (optional hourOffset is the last 24 hours if not specified)');
CliMap.set('get lowest total --{hourOffset}','Show lowest total order within last specific hours (optional hourOffset is the last 24 hours if not specified)');
CliMap.set('list sales metrics --{hourOffset}','List metrics of all sales within last specific hours (optional hourOffset is the last 24 hours if not specified)');
CliMap.set('list pizza metrics --{hourOffset}','List metrics of all pizza sold within last specific hours (optional hourOffset is the last 24 hours if not specified)');
CliMap.set('list wings metrics --{hourOffset}','List metrics of all chicken wings sold within last specific hours (optional hourOffset is the last 24 hours if not specified)');
CliMap.set('list breadsticks metrics --{hourOffset}','List metrics of all breadsticks sold within last specific hours (optional hourOffset is the last 24 hours if not specified)');
CliMap.set('list soda metrics --{hourOffset}','List metrics of all soda sold within last specific hours (optional hourOffset is the last 24 hours if not specified)');

const CliCommandArray = new Array();
CliCommandArray.push('exit');
CliCommandArray.push('man');
CliCommandArray.push('help');
CliCommandArray.push('menu');
CliCommandArray.push('list orders');
CliCommandArray.push('more order info');
CliCommandArray.push('list users');
CliCommandArray.push('more user info');
CliCommandArray.push('get sales total');
CliCommandArray.push('get highest total');
CliCommandArray.push('get median total');
CliCommandArray.push('get lowest total');
CliCommandArray.push('list sales metrics');
CliCommandArray.push('list pizza metrics');
CliCommandArray.push('list wings metrics');
CliCommandArray.push('list breadsticks metrics');
CliCommandArray.push('list soda metrics');

module.exports.ImageMap = ImageMap;
module.exports.CliMap = CliMap;
module.exports.CliCommandArray = CliCommandArray;