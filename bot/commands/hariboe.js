/**
 * Created by Pablo on 24 Jul 17.
 */

module.exports = {
    name: 'hariboe',
    exec(message){
        message.reply('<:hariboepeek:339080617180266497>').then(reply => {
            message.delete();
            reply.delete(4000);
        });
    }
};