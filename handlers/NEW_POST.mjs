import Post from "../models/Post.mjs";

export default function(wsm, debug, payload) {
    debug.logEvents ? console.log(`[blowjs | WebSocketManager]: A new post has been caught`) : 0;
    wsm.client.emit('post', new Post(
        payload.postdata.postid,
        payload.postdata.username,
        payload.postdata.content,
        payload.postdata.locked,
        payload.postdata.pnsfw,
        payload.postdata.edited,
        payload.postdata.post_date,
        payload.postdata.replies.replies
    ));
}