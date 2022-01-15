# blowjs
blowjs is a bubblez api wrapper meant for ease of use and optimization, along with confirgurability

Want to learn how to use blowjs? Visit the docs <u>[here](/DOCS.md)</u> (only accessible on GitHub).

## Example of blowjs
```js
import Client from 'blowjs';
const client = new Client();

import dotenv from 'dotenv';
dotenv.config();

client.once('ready', user => {
    console.log(`👀 Logged in as ${user.username}`);
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
```

##### Bubblez Approval
###### [Bubblez.app](https://bubblez.app/library#blowjs) has approved blowjs
