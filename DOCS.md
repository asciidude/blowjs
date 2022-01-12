##### *The documentation is currently a work in progress, it may seem messy or uninformative. I plan on improving this.*

# blowjs documentation

## Table of Contents
* [Events](#events)
* [Users](#users)
* [Posts](#posts)

## Events
### The list of events and their descriptions - along with their return value(s)

**AUTHENTICATED:** This will fire the `ready` event, this means the client is ready to be used. This will also create an interval, the interval time is decided by the server - if no interval time has been provided it will default to `4000` (4s).

**AUTHENTICATION_REQUIRED:** This will send the token to the Bubblez API, along with the API version which is being used (configurable using `Constants`, which can be changed in the `Client` class).

**HEARTBEAT_ACK:** This will notify you that the heartbeat sent was acknowledged, if it was not it should move on to the `HEARTBEAT_MISSED` event, to re-send the heartbeat.

**HEARTBEAT_MISSED:** This will re-send the heartbeat if the heartbeat sent before was zombified.

**NEW_DEVLOG:** This will fire the `devlog` event, though the payload data is not yet converted to the `Post` class - it will return the payload data.

**NEW_FOLLOWER:** This will fire the `follow` event, the payload data is once again not converted to the `User` class yet - though it will turn a user.

**NEW_LIKE:** This will fire the `like` event, though the payload data is not yet converted to the `Post` class - it will return the payload data.

**NEW_POST:** This will fire the `post` event, which will return post data.

**NEW_REPLY:** This will fire the `reply` event, which will also return the `Reply` data.

**UNFOLLOWED:** This will fire the `unfollow` event, the payload data is once again not converted to the `User` class yet - though it will turn a user.

## Users

### The user class
The user class will provide you with all information that is avaliable about the user, replies can only be seen if the user is the client - otherwise the `replies` object will be nullified (why this happens is beyond me).

As a fair warning, currently the user class has no functionality other than retrieving information for the `ready` event.

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

This section is a work in progress, aka no information is yet provided.