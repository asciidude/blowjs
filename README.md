# blowjs
blowjs is a bubblez api wrapper meant for ease of use and optimization, along with confirgurability

Want to learn how to use blowjs? Visit the docs [here](/DOCS.md) (only accessible on GitHub).

Having issues and need support? Visit our Discord [here](https://discord.gg/czfj9DyY7F).

## Example of blowjs
```js
import Client from './index.mjs';
const client = new Client();

import dotenv from 'dotenv';
dotenv.config();

console.log('👌 Loading up blowjs!');

client.once('ready', async() => {
    console.log(`👀 Logged in as ${client.user.username}`);
});

client.on('post', async post => {
    console.log(`😉 A new post has been posted with the content of "${post.content}"`);

    switch(post.content) {
        case 'hello blowjs':
            post.reply('hi :)', null, false);
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
```

##### Bubblez Approval
###### [Bubblez.app](https://bubblez.app/library#blowjs) has approved blowjs
