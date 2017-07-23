/**
 * Created by Pablo on 24 Jul 17.
 */

module.exports = {
    name: 'hariboe',
    exec(message){
        message.reply('<:hariboepeek:338422524398534667>').then(reply => {
            message.delete();
            reply.delete(4000);
        });
    }
};