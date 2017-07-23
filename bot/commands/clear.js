/**
 * Created by Pablo on 24 Jul 17.
 */

module.exports = {
    name: 'clear',
    exec(message){
        message.delete().then(() => {
            delete_messages(message.channel, 1000);
        }).catch(console.error);
    }
};

const max_delete_message = 100;
const delete_messages = (channel, number) => {
    if(1 >= number) return;

    const current_channel_messages = channel.messages.array().length;
    if(1 >= current_channel_messages) return;

    let current_delete_number = (max_delete_message > number) ? number : max_delete_message;
    current_delete_number = (current_delete_number > current_channel_messages) ? current_channel_messages : current_delete_number;

    channel.bulkDelete(current_delete_number)
        .then(() => delete_messages(channel, number - current_delete_number))
        .catch(() => {  });
};