/**
 * Created by Pablo on 22 Jul 17.
 */
try{
    global.config = require('./config.json');
} catch (e){
    throw 'Config file is not valid.';
}

require('./bot/bot').init();