/**
 * Created by Pablo on 22 Jul 17.
 */

const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

global.bot = new Discord.Client();

module.exports = {
    init(){

        bot.login(config.bot.token).then(() => {

            fs.readdirSync(path.join(__dirname, "events")).forEach((name) =>{
                //bot.on(<nombre del archivo sin extension>, require(nombre del archivo))
                bot.on(/(.+)\.js/i.exec(name)[1], require(`./events/${name}`));
            });

            console.log('The bot is ready to tech!');

        }).catch(console.error);
    }
};