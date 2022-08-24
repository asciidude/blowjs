import Client from '../index.mjs';
import { wsmDebug } from '../index.mjs';
const client = new Client();

import dotenv from 'dotenv';
dotenv.config();

console.log('👌 Loading up blowjs!');
wsmDebug.logEvents = true

client.once('ready', async() => {
    console.log(`👀 Logged in as ${client.user.username}`);
});

client.on('post', async post => {
    console.log(`😉 A new post has been posted with the content of "${post.content}"`);

    switch(post.content) {
        case 'hello blowjs':
            post.reply('hi :)', 'epic blowjs bot', false);
            break;

        case 'whats the latest devlog?':
            const latestBlog = await client.blogs.getLatest();
            post.reply(latestBlog.content);
            break;
    }
});

client.once('close', code => {
    console.log(`🔒 Closed on code ${code}`);
});

client.login(process.env.TOKEN);