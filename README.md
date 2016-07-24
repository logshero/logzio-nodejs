# logzio-nodejs
NodeJS logger for LogzIO. 
The logger stashes the log messages you send into an array which is sent as a bulk once it reaches its size limit (100 messages) or time limit (10 sec) in an async fashion.
It contains a simple retry mechanism which upon connection reset (server side) or client timeout, wait a bit (default interval of 2 seconds), and try this bulk again (it does not block other messages from being accumulated and sent (async). The interval increases by a factor of 2 between each retry, until we reached the maximum allowed attempts (3).
 
 By default any error is logged to the console. This can be changed by supplying a callback function.


## Sample usage
```javascript
var logger = require('logzio-nodejs').createLogger({
    token: '__YOUR_API_TOKEN__',
    type: 'YourLogType'     // OPTIONAL (If none is set, it will be 'nodejs')
});


// sending text
logger.log('This is a log message');

// sending an object
var obj = { 
    message: 'Some log message', 
    param1: 'val1',
    param2: 'val2'
};
logger.log(obj);
```

## Options

* **token** 
    Mandatory. Your API logging token. Look it up in the Device Config tab in Logz.io
* **type** - Log type. Help classify logs into different classifications
* **protocol** - 'http' or 'https'. Default: http
* **sendIntervalMs** - Time in milliseconds to wait between retry attempts. Default: 2000 (2 sec)
* **bufferSize** - The maximum number of messages the logger will accumulate before sending them all as a bulk. Default: 100.
* **numberOfRetries** - The maximum number of retry attempts. Default: 3
* **debug** - Should the logger print debug messages to the console? Default: false
* **callback** - a callback function called when an unrecoverable error has occured in the logger. The function API is: function(err) - err being the Error object.
* **timeout** - the read/write/connection timeout in milliseconds.
* **addTimestampWithNanoSecs** - Add a timestamp with nano seconds granularity. This is needed when many logs are sent in the same millisecond, so you can properly order the logs in kibana. The added timestamp field will be `@timestamp_nano` Default: false

## Update log
**0.3.9**
- Added option to add a timestamp with nano second granularity

**0.3.8**
- Updated listener url
- Added `sendAndClose()` method which immediately sends the queued messages and clears the global timer
- Added option to supress error messages

**0.3.6**
- Fixed URL for github repository in package.json

**0.3.5**
- Bug fix : upon retry (in case of network error), the message gets sent forever  

**0.3.4**
- Bug fix : `jsonToString()` was throwing an error in the catch()block  

**0.3.2**  
- Enhancement : Added option to attach extra fields to each log in a specific instance of the logger.

**0.3.1**
- Bug fix : When calling `log` with a string parameter, the object isn't constructed properly.  



# Contibutors

- run `npm install` to install required dependencies
- run `npm test` to run unit tests
