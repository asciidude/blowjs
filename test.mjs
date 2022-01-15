import Client from './index.mjs';
const client = new Client();

import dotenv from 'dotenv';
dotenv.config();

console.log('👌 Loading up blowjs!');

client.once('ready', () => {
    console.log(`👀 Logged in as ${client.user.username}`);
});

client.on('post', post => {
    console.log(`😉 A new post has been posted with the content of "${post.content}"`);

    // TODO: Switch to command handler
    switch(post.content) {
        case 'hello_bot':
            post.reply('hi :)', null, false);
            break;

        case 'latest_devlog?':
            post.reply(
                client.blogs.getLatest().content
            );
            break;
    }
});

client.on('reply', reply => {
    console.log(`🎉 New reply! ${reply.content}`);
});

client.once('close', code => {
    console.log(`🔒 Closed on code ${code}`);
});

client.login(process.env.TOKEN);