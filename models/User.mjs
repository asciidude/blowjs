import Post from "./Post.mjs";
import Reply from "./Reply.mjs";

export default class User {
    constructor(
        client,
        found, uuid, username, displayName, pfp, banner, coins,
        rank, recentEvent, patreon, booster, bio, nsfw, pronouns,
        banned, createdAt, lastPosted, posts
    ) {
        this.client = client;
        this.found = found === "Found user" ? true : false;
        this.uuid = uuid;
        this.username = username;
        this.displayName = displayName;
        this.pfp = pfp;
        this.banner = banner;
        this.coins = coins;
        this.rank = rank;
        this.recentEvent = recentEvent;
        this.patreon = patreon === "true" ? true : false || patreon;
        this.booster = booster === "true" ? true : false || booster;
        this.bio = bio === "" ? true : false;
        this.nsfw = nsfw === "true" ? true: false || nsfw;
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

    /**
     * Search for a user by username
     * @param username The username to search for
     * @returns User class
     */
    async get(username) {
        let params = new URLSearchParams();
        params.append('token', this.client.ws.token);
        params.append('username', username);

        const user = await fetch(`${Constants.API_URL}/user/get`, {
            method: 'POST',
            body: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(r => r.json());

        return new User(
            this.client,
            user['200'],
            user.uuid,
            user.username,
            user.displayname,
            user.pfp,
            user.banner,
            user.coins,
            user.rank,
            user.eventr,
            user.patreon,
            user.booster,
            user.bio,
            user.nsfw,
            user.pronoun,
            user.ban,
            user.created_at,
            user.last_posted,
            user.posts
        );
    }
}