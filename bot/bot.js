/**
 * Created by Pablo on 22 Jul 17.
 */

const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

global.bot = new Discord.Client();
global.bot_commands = [ ];

module.exports = {
    init(){

        bot.login(config.bot.token).then(() => {

            fs.readdirSync(path.join(__dirname, "commands")).forEach((name) =>{
                const command = require(`./commands/${name}`);
                bot_commands.push(command.name);
            });

            fs.readdirSync(path.join(__dirname, "events")).forEach((name) =>{
                bot.on(/(.+)\.js/i.exec(name)[1], require(`./events/${name}`));
            });

            bot.user.setGame(global.config.playing_game).catch(console.error);

            console.log('The bot is ready to tech!');

        }).catch(console.error);
    }
};