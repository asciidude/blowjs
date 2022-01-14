import Post from "./Post.mjs";
import Reply from "./Reply.mjs";

export default class User {
    constructor(
        client,
        found, uuid, username, displayName, email, pfp, banner, coins,
        rank, recentEvent, patreon, booster, bio, nsfw, birthdate, pronouns,
        banned, createdAt, lastPosted, posts
    ) {
        this.client = client;
        this.found = found === "Found user" ? true : false;
        this.uuid = uuid;
        this.username = username;
        this.displayName = displayName;
        this.email = email;
        this.pfp = pfp;
        this.banner = banner;
        this.coins = coins;
        this.rank = rank;
        this.recentEvent = recentEvent;
        this.patreon = patreon === "true" ? true : false || patreon;
        this.booster = booster === "true" ? true : false || booster;
        this.bio = bio === "" ? true : false;
        this.nsfw = nsfw === "true" ? true: false || nsfw;
        this.birthdate = birthdate;
        this.pronouns = pronouns === "none" ? null : pronouns;
        this.banned = banned === null ? false : true;
        this.createdAt = new Date(createdAt);
        this.lastPosted = new Date(lastPosted);
        this.posts = [];

        if(posts != null) {
            for(const post of posts) {
                if(posts.length == 0) return this.posts = null;

                this.posts.push(
                    new Post(
                        this.client,
                        post.postid,
                        post.username,
                        post.content,
                        post.locked,
                        post.pnsfw,
                        post.edited,
                        post.post_date,
                        []
                    )
                )
            }
        } else {
            this.posts = null;
        }
    }

    async get(id) {
        // work on later
    }
}