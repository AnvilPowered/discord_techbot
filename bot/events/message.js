/**
 * Created by Pablo on 22 Jul 17.
 */

module.exports = (message) => {

    if(!message.guild) return;

    if(!message.content.startsWith(config.prefix)) return;

    const command_options = message.content.split(' ');
    const command_name = command_options[0].toLowerCase().replace(config.prefix, '');
    if(bot_commands.indexOf(command_name) > -1){
        const command = require(`../commands/${command_name}`);

        if(!has_permission(command, message.member, message.channel)) return;

        command.exec(message);
        return;
    }

    role_commands(message);

};

function has_permission(command, member, channel) {

    if(command.permission === undefined) return true;

    let has = false;
    Object.keys(command.permission).forEach(permission_key => {

        if(member.roles.get(permission_key)){
            const command_permission_channels = command.permission[permission_key];

            if(command_permission_channels === '*') has = true;
            if(command_permission_channels === channel.name) has = true;

        }

    });
    return has;
}

const role_commands = (message) => {

    if(message.channel.name !== 'tech-role-spam') return;

    const is_remove_option = message.content.startsWith(`${config.prefix}remove `);

    const message_role_name = message.content.replace(is_remove_option ? `${config.prefix}remove ` : config.prefix, '');
    let user_role_name = undefined;

    Object.keys(config.roles).forEach(role_name => {

        config.roles[role_name].forEach(possible_role_name => {

            if(message_role_name.toLowerCase() === possible_role_name.toLowerCase())
                user_role_name = role_name;

        });

    });

    if(user_role_name === undefined) return;

    const rol = message.guild.roles.findKey('name', user_role_name);

    const message_to_user = () => {
        message.reply(is_remove_option
            ? `you have been removed from the ${user_role_name} rol.`
            : `you have been given the role of ${user_role_name}.`
        )
            .then(reply_message => {
                message.delete();
                reply_message.delete(3000);
            })
            .catch(console.error);
    };

    const role_add_or_remove = is_remove_option ? message.member.removeRole(rol) : message.member.addRole(rol);

    role_add_or_remove.then(() => message_to_user()).catch(console.error);
};