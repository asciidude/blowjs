import { Constants } from '../constants/Constants.mjs';
import fetch from 'node-fetch';
import User from './User.mjs';

export default class Post {
    constructor(
        client, id, author, content, locked, nsfw, edited, createdAt, replies
    ) {
        this.id = id;
        this.author = author;
        this.locked = locked;
        this.content = content;
        this.nsfw = nsfw;
        this.edited = edited === null ? false : edited;
        this.createdAt = new Date(createdAt);
        this.replies = [];

        this.client = client;

        if(replies != null) {
            for(const reply of replies) {
                if(replies.length == 0) return this.replies = null;

                this.replies.push(
                    new Reply(
                        this.client,
                        reply.replyid,
                        reply.postid,
                        reply.username,
                        reply.content,
                        reply.rnsfw,
                        reply.edited,
                        reply.from,
                        reply.reply_date
                    )
                )
            }
        } else {
            this.replies = null;
        }
    }

    /**
     * Return a post object
     * @param {String} id The ID of the post to get
     * @returns Post object
     */
    async get(id) {
        let params = new URLSearchParams();
        params.append('token', this.client.ws.token);
        params.append('postid', id);

        const post = await fetch(`${Constants.API_URL}/post/get`, {
            method: 'POST',
            body: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(r => r.json());

        return new Post(
            this.client,
            post.postid,
            new User(this.client).get(post.username),
            post.content,
            post.locked,
            post.pnsfw,
            post.edited,
            post.post_date,
            post.replies.replies
        );
    }

    /**
     * Create a post
     * @param {String} message The message itself
     * @param {String} from The message by the post date
     * @param {Boolean} locked Determines if users can reply to the post
     * @param {Boolean} nsfw Determines whether or not the post is NSFW
     * @returns post id
     */
    async create(message, from='blowjs', locked=false, nsfw=false) {
        if(!message) throw `[blowjs | Post]: Cannot create an empty post, provide a message`;

        let params = new URLSearchParams();
        params.append('token', this.client.ws.token);
        params.append('post', message);
        params.append('from', from);
        params.append('locked', locked);
        params.append('nsfw', nsfw);

        const post = await fetch(`${Constants.API_URL}/post/send`, {
            method: 'POST',
            body: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(r => r.json());

        return this.get(post.postid);
    }

    /**
     * Create a reply to the current post
     * @param message The message of the reply
     * @param from The text beside the post timestamp
     * @param nsfw Determines whether there is an NSFW tag on your reply
     * @returns object: id (reply id), post (post id)
     */
    async reply(message, from, nsfw) {
        if(!this.id) throw `[blowjs | Reply]: The ID provided is invalid, unable to reply`;
        if(!message) throw `[blowjs | Reply]: Cannot create an empty reply, provide a message`;

        let params = new URLSearchParams();
        params.append('token', this.client.ws.token);
        params.append('postid', this.id);
        params.append('reply', message);
        params.append('from', from);
        params.append('nsfw', nsfw);

        const reply = await fetch(`${Constants.API_URL}/reply/send`, {
            method: 'POST',
            body: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(r => r.json());

        if(reply.error) throw `[blowjs | Post]: Cannot reply to post, it is either locked or doesn't exist`;

        return { id: reply.replyid, post: this.get(reply.postid) };
    }

    /**
     * Lock or unlock a post based off a boolean-value
     * @param {String} id The post ID to lock
     * @param {Boolean} toggle Lock or unlock the post
     */
    async lock(id, toggle) {
        if(!toggle) throw `[blowjs | Post]: No toggle boolean has been provided`;

        let params = new URLSearchParams();
        params.append('token', this.client.ws.token);
        params.append('togglelock', toggle);
        params.append('postid', id);

        const lock = await fetch(`${Constants.API_URL}/post/lock`, {
            method: 'POST',
            body: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(r => r.json());

        if(lock.error) throw `[blowjs | Post]: Cannot lock post, you likely do not have permission`;

        return { id: id, locked: toggle };
    }
}