import { Constants } from '../constants/Constants.mjs';
import fetch from 'node-fetch';
import Post from './Post.mjs';
import User from './User.mjs';

export default class Reply {
    constructor(
        client, id, parentID, author, content, nsfw, edited, createdAt, from
    ) {
        this.client = client;

        this.id = id;
        this.parentID = parentID;
        this.author = getAuthor(client, author);
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

        let params = new URLSearchParams();
        params.append('token', this.client.ws.token);
        params.append('postid', id);
        params.append('reply', message);
        params.append('from', from);
        params.append('nsfw', nsfw);

        const reply = await fetch(`${Constants.API_URL}/reply/send`, {
            method: 'POST',
            body: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(r => r.json());

        if(reply.error) throw `[blowjs | Reply]: Cannot reply to post, it is either locked or doesn't exist`;

        return { id: reply.replyid, post: await new Post(this.client).get(reply.postid) };
    }

    /**
     * Delete a reply
     * @param {String} id The ID of the reply you want to delete
     * @param {Boolean} confirm Confirm if you want to delete this or not, automatically it is set to true
     */
    async delete(id, confirm=true) {
        if(!id) throw `[blowjs | Reply]: Cannot delete nothing, please provide an ID`;

        let params = new URLSearchParams();
        params.append('token', this.client.ws.token);
        params.append('confirm', confirm);
        params.append('replyid', id);

        const reply = await fetch(`${Constants.API_URL}/reply/delete`, {
            method: 'POST',
            body: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(r => r.json());

        if(reply.error) throw `[blowjs | Reply]: Cannot delete reply, it doesn't exist or you don't have permission to delete it.`;
    }
}

/**
 * WARNING: This should not be used by anyone, this is simply so I can get the reply author
 */
const getAuthor = async (client, author) => {
    const returnedAuthor = await new User(client).get(author);
    if(!returnedAuthor) return null;
    else return returnedAuthor;
}