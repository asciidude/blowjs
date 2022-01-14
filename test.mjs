import { Client } from './index.mjs';
const client = new Client();

import dotenv from 'dotenv';
dotenv.config();

client.once('ready', () => {
    console.log(`👀 Logged in as ${client.user.username}`);
});

client.on('post', post => {
    console.log(`🎉 New post! ${post.content}`);
});

client.on('reply', reply => {
    console.log(`🎉 New reply! ${reply.content}`);
});

client.once('close', code => {
    console.log(`🔒 Closed on code ${code}`);
});

client.login(process.env.TOKEN);