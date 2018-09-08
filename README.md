# PizzaDeliveryCLI

This is the command line interface (continuation of) [PizzaDeliveryGUI](https://github.com/laekettavong/PizzaDeliveryGUI). With the CLI, a system admin can make various dashboard-like queries to ascertain hourly/daily transactions/users metrics and details. Following is the currently supported command set.


| Command                                 	| Description                                                                                                                   	|
|-----------------------------------------	|-------------------------------------------------------------------------------------------------------------------------------	|
| exit                                    	| Kill the CLI (and the rest of the application)                                                                                	|
| man                                     	| Show this help page                                                                                                           	|
| help                                    	| Alias of the "man" command                                                                                                    	|
| menu                                    	| Show current menu items                                                                                                       	|
| list orders --{hourOffset}              	| Show list of all orders within last specific hours (optional hourOffset is the last 24 hours if not specified)                	|
| more order info --{orderId}             	| Show details of a specific order                                                                                              	|
| list users --{hourOffset}               	| Show list of all users registered within last specific hours (optional hourOffset is the last 24 hours if not specified)      	|
| more user info --{userId}               	| Show details of a specific user                                                                                               	|
| get sales total --{hourOffset}          	| Show total sale within last specific hours (optional hourOffset is the last 24 hours if not specified)                        	|
| get highest total --{hourOffset}        	| Show highest total order within last specific hours (optional hourOffset is the last 24 hours if not specified)               	|
| get median total --{hourOffset}         	| Show median total order within last specific hours (optional hourOffset is the last 24 hours if not specified)                	|
| get lowest total --{hourOffset}         	| Show lowest total order within last specific hours (optional hourOffset is the last 24 hours if not specified)                	|
| list sales metrics --{hourOffset}       	| List metrics of all sales within last specific hours (optional hourOffset is the last 24 hours if not specified)              	|
| list pizza metrics --{hourOffset}       	| List metrics of all pizza sold within last specific hours (optional hourOffset is the last 24 hours if not specified)         	|
| list wings metrics --{hourOffset}       	| List metrics of all chicken wings sold within last specific hours (optional hourOffset is the last 24 hours if not specified) 	|
| list breadsticks metrics --{hourOffset} 	| List metrics of all breadticks sold within last specific hours (optional hourOffset is the last 24 hours if not specified)    	|
| list soda metrics --{hourOffset}        	| List metrics of all soda sold within last specific hours (optional hourOffset is the last 24 hours if not specified)          	|