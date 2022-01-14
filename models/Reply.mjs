import { Constants } from '../constants/Constants.mjs';
import fetch from 'node-fetch';

export default class Reply {
    constructor(
        client, id, parentID, author, content, nsfw, edited, createdAt, from
    ) {
        this.client = client;

        this.id = id;
        this.parentID = parentID;
        this.author = author;
        this.content = content;
        this.nsfw = nsfw;
        this.from = from;
        this.edited = edited === null ? false : edited;
        this.createdAt = new Date(createdAt);
    }

    /**
     * Reply to a post
     * @param {String} id The ID of the post to reply to
     * @param {String} message The message that will be provided in the reply
     * @param {String} from The text by the date
     * @param {Boolean} nsfw Determines whether or not the reply is marked as NSFW
     * @returns object: id (reply id), post (post id)
     */
    async create(id, message, from='blowjs', nsfw=false) {
        if(!id) throw `[blowjs | Reply]: Cannot reply to nothing, provide a post ID`;
        if(!message) throw `[blowjs | Reply]: Cannot create an empty reply, provide a message`;

        let r_params = new URLSearchParams();
        r_params.append('token', this.client.ws.token);
        r_params.append('postid', id);
        r_params.append('reply', message);
        r_params.append('from', from);
        r_params.append('nsfw', nsfw);

        const reply = await fetch(`${Constants.API_URL}/reply/send`, {
            method: 'POST',
            body: r_params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(r => r.json());

        if(reply.error) throw `[blowjs | Reply]: Cannot reply to post, it is either locked or doesn't exist`;

        return { id: reply.replyid, post: reply.postid };
    }
}