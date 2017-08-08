/**
 * Created by Pablo on 22 Jul 17.
 */
try{
    global.config = require('./config.json');
} catch (e){
    throw 'Config file is not valid.';
}

require('./bot/bot').init();

// const fs = require('fs');
// const path = require('path');
// const Discord = require('discord.js');
//
// global.bot = new Discord.Client();
//
// bot.login(global.config.bot.token).then(() => {
//     bot.channels.get('339077393077501952').fetchMessage('339774965513715714').then(message => {
//         message.edit(fs.readFileSync(path.join(__dirname, '/messages/tech-role-help')).toString());
//     }).catch(console.error);
// });