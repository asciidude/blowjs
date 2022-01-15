import WebSocketManager from '../ws/WebSocketManager.mjs';
import EventEmitter from 'events';
import Post from '../models/Post.mjs';
import Reply from '../models/Reply.mjs';
import User from '../models/User.mjs';
import ClientUser from './ClientUser.mjs';
import fetch from 'node-fetch';
import { Constants } from '../constants/Constants.mjs';
import Blog from '../models/Blog.mjs';

export default class Client extends EventEmitter {
    constructor() {
        super();
        this.ws = new WebSocketManager(this);
        this.posts = new Post(this);
        this.replies = new Reply(this);
        this.users = new User(this);
        this.blogs = new Blog(this);
        this.user = null;
    }

    async login(token) {
        await this.ws.connect(token);

        // ClientUser
        let params = new URLSearchParams();
        params.append('token', this.ws.token);

        const user = await fetch(`${Constants.API_URL}/user/check`, {
            method: 'POST',
            body: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(r => r.json());

        this.user = new ClientUser(
            this,
            user['200'],
            user.uuid,
            user.username,
            user.displayname,
            user.email,
            user.pfp,
            user.banner,
            user.coins,
            user.rank,
            user.eventr,
            user.patreon,
            user.booster,
            user.bio,
            user.nsfw,
            user.dob,
            user.pronoun,
            user.ban,
            user.created_at,
            user.last_posted,
            user.posts,
            user.replies
        );
    }
}