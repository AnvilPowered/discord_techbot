/**
 * Created by Pablo on 22 Jul 17.
 */

module.exports = (message) => {

    if(!message.guild) return;

    if(message.channel.name !== 'tech-role-spam') return;

    if(!message.content.startsWith(config.prefix)) return;

    //region Hariboe
        if(message.content.toLowerCase() === `${config.prefix}hariboe`){
            message.reply('<:hariboepeek:338422524398534667>').then(reply => {
                message.delete();
                reply.delete(4000);
            });
            return;
        }
    //endregion

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
                reply_message.delete(4000);
            })
            .catch(console.error);
    };

    const role_add_or_remove = is_remove_option ? message.member.removeRole(rol) : message.member.addRole(rol);

    role_add_or_remove.then(() => message_to_user()).catch(console.error);

};