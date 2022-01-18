<sm>*The documentation is currently a work in progress, it may seem messy or uninformative. I plan on improving this.*</sm>

# blowjs documentation

## Table of Contents

* [Events](#events)
* [Users](#user)
* [Posts](#post)
* [Replies](#reply)
* [Blogs/Devlogs](#blog)

## Events

### The list of events and their descriptions - along with their return value(s)

**AUTHENTICATED:** This will fire the `ready` event.\
**AUTHENTICATION_REQUIRED:** This will send your token to the Bubblez API.\
**HEARTBEAT_ACK:** This will notify you that the heartbeat sent was acknowledged, if it was not it should move on to the `HEARTBEAT_MISSED` event, to re-send the heartbeat.\
**HEARTBEAT_MISSED:** This will re-send the heartbeat if the heartbeat sent before was zombified.\
**NEW_DEVLOG:** This will fire the `devlog` event, returning a `Blog` class.\
**NEW_FOLLOWER:** This will fire the `follow` event, returning the `User` class.\
**NEW_LIKE:** This will fire the `like` event, returning a `User` class.\
**NEW_POST:** This will fire the `post` event, returning a `Post` class.\
**NEW_REPLY:** This will fire the `reply` event, returning a `Reply` class.\
**UNFOLLOWED:** This will fire the `unfollow` event, returning a `User` class.

## User

### The user class

The user class will provide you with all information that is avaliable about the user, replies are only available to the client, look at [ClientUser](#ClientUser) to see this

```js
{
    client: Client,
    found: Boolean,
    uuid: String,
    username: String,
    displayName: String,
    email: String,
    pfp: String,
    banner: String,
    coins: Number,
    rank: String,
    recentEvent: String,
    patreon: Boolean,
    booster: Boolean,
    bio: String,
    nsfw: Boolean,
    birthdate: String,
    pronouns: String,
    banned: Boolean,
    createdAt: Date,
    lastPosted: Date,
    posts: Array,
    replies: Array
}
```

### Getting a user

To get a user, simply run `Client#users.get(username)`

`Client` is the client object\
`users` is the User class, initialized with `Client`\
`get()` is the get user method

`username` is the username of the user to search for

This will return a `User` object, if the user was found

## ClientUser

### The client user class

The client user class provides all information about the client user, along with some functionality only for the ClientUser (eg. being able to see replies).

```js
{
    client: Client,
    found: Boolean,
    uuid: String,
    username: String,
    displayName: String,
    email: String,
    pfp: String,
    banner: String,
    coins: Number,
    rank: String,
    recentEvent: String,
    patreon: Boolean,
    booster: Boolean,
    bio: String,
    nsfw: Boolean,
    birthdate: String,
    pronouns: String,
    banned: Boolean,
    createdAt: Date,
    lastPosted: Date,
    posts: Array,
    replies: Array
}
```

### Pinging the client

To ping the client, simply run `Client#user.ping();`

`Client` is the client object\
`user` is the ClientUser class, initialized with `Client`\
`ping()` is the ping user method

This will return an object containing:

* ping: A ping object (found?, username, lastOnline)
* reponseTime: The response time

## Post

### The post class

The post class contains all available information about posts.

```js
{
    client: Client,
    id: String,
    author: String,
    locked: Boolean,
    content: String,
    nsfw: Boolean,
    edited: Boolean,
    createdAt: Date,
    replies: Array
}
```

### Getting a post

To get a post, simply run `Client#posts.get(id)`

`Client` is the client object\
`posts` is the Post class, initialized with `Client`\
`get()` is the get post method

`id` is the ID of the post

This will return a `Post` object, if the post was found

### Creating a post

To create a post, run `Client#posts.create(message, from, locked, nsfw)`

`Client` is the client object\
`posts` is the Post class, initialized with `Client`\
`create()` is the create post method

`message` is the message the post will contain\
`from` is the text besides the post timestamp\
`locked` determines if the post is locked or not (no replies)\
`nsfw` determines if the post is marked as nsfw

This will return the post ID

### Replying to a post

**This is only if there is a post to reply to. See [here](#replies) to create a reply by post ID.** To reply to a post, run `Post#reply(message, from, nsfw)`

`Post` is the post object\
`reply()` is the reply method

`message` is the message of the reply\
`from` is the text besides the post timestamp\
`nsfw` determines if the reply is marked as nsfw

This will return an object containing:

* id: reply id
* post: post id

## Reply

### The reply class

The post class contains all available information about posts.

```js
{
    client: Client,
    id: String,
    parentID: String,
    author: String,
    content: String,
    nsfw: Boolean,
    from: String,
    edited: Boolean,
    createdAt: Date
}
```


### Creating a reply

To create a reply, run `Client#replies.create(id, message, from, nsfw)`

`Client` is the client object\
`replies` is the Reply class, initialized with Client\
`create()` is the create method

`id` is the ID of the post to reply to\
`message` is the message of the reply\
`from` is the text by the creation timestamp\
`nsfw` determines whether or not the reply is marked as nsfw

This will return an object containing:

* id: reply id
* post: post id

## Blog

### The blog class

The post class contains all available information about posts.

```js
{
    client: Client,
    found: Boolean,
    id: String,
    poster: String,
    content: String,
    createdAt: Date
}
```

### Getting the latest blog

To get the latest blog post, run `Client#blogs.getLatest()`

`Client` is the client object\
`blogs` is the Reply class, initialized with Client\
`getLatest()` is the get latest method

This will return the `Blog` class
