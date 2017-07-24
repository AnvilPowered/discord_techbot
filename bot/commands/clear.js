/**
 * Created by Pablo on 24 Jul 17.
 */

module.exports = {
    name: 'clear',
    permission: {
        '291860547039789066': '*',//mod
        '291860607911723008': '*',//root
    },
    exec(message){
        message.delete().then(() => {
            delete_messages(message.channel, 1000);
        }).catch(console.error);
    }
};

const max_delete_message = 100;
const delete_messages = (channel, number) => {
    if(1 >= number) return;

    const current_delete_number = (max_delete_message > number) ? number : max_delete_message;

    channel.bulkDelete(current_delete_number)
        .then(() => delete_messages(channel, number - current_delete_number))
        .catch(() => {  });
};