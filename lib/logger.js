var log4js = require('C:/Users/root/AppData/Roaming/npm/node_modules/log4js');

log4js.configure({
    
appenders: [
   { type: 'console' },
   
   { type: 'file', filename: "../logs/testware.log", category: 'CityEyes_API' }
   ]
});
var logger  = log4js.getLogger('CityEyes_API');

            logger.setLevel('ALL');
            
            Object.defineProperty(exports, "log", {
                
                        value:logger,
            });