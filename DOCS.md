##### *The documentation is currently a work in progress, it may seem messy or uninformative. I plan on improving this.*

# blowjs documentation

## Table of Contents
* [Events](#events)
* [Users](#users)
* [Posts](#posts)
* [Replies](#replies)

## Events
### The list of events and their descriptions - along with their return value(s)

**AUTHENTICATED:** This will fire the `ready` event, this means the client is ready to be used. This will also create an interval, the interval time is decided by the server - if no interval time has been provided it will default to `4000` (4s).\
**AUTHENTICATION_REQUIRED:** This will send the token to the Bubblez API, along with the API version which is being used (configurable using `Constants`, which can be changed in the `Client` class).\
**HEARTBEAT_ACK:** This will notify you that the heartbeat sent was acknowledged, if it was not it should move on to the `HEARTBEAT_MISSED` event, to re-send the heartbeat.\
**HEARTBEAT_MISSED:** This will re-send the heartbeat if the heartbeat sent before was zombified.\
**NEW_DEVLOG:** This will fire the `devlog` event, though the payload data is not yet converted to the `Post` class - it will return the payload data.\
**NEW_FOLLOWER:** This will fire the `follow` event, the payload data is once again not converted to the `User` class yet - though it will turn a user.\
**NEW_LIKE:** This will fire the `like` event, though the payload data is not yet converted to the `Post` class - it will return the payload data.\
**NEW_POST:** This will fire the `post` event, which will return post data.\
**NEW_REPLY:** This will fire the `reply` event, which will also return the `Reply` data.\
**UNFOLLOWED:** This will fire the `unfollow` event, the payload data is once again not converted to the `User` class yet - though it will turn a user.

## Users

### The user class
The user class will provide you with all information that is avaliable about the user, replies can only be seen if the user is the client - otherwise the `replies` object will be nullified (why this happens is beyond me).

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

## Posts

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

## Replies

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