import WebSocketManager from '../ws/WebSocketManager.mjs';
import EventEmitter from 'events';
import { Constants } from '../constants/Constants.mjs';
import fetch from 'node-fetch';
import Post from '../models/Post.mjs';

export default class Client extends EventEmitter {
    constructor() {
        super();
        this.ws = new WebSocketManager(this);
    }

    async login(token) {
        await this.ws.connect(token);
    }

    async getPost(id) {
        let params = new URLSearchParams();
        params.append('token', this.ws.token);
        params.append('postid', id);

        const post = await fetch(`${Constants.API_URL}/post/get`, {
            method: 'POST',
            body: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(r => r.json());

        return new Post(
            post.postid,
            post.username,
            post.content,
            post.locked,
            post.pnsfw,
            post.edited,
            post.post_date,
            post.replies.replies
        );
    }
}