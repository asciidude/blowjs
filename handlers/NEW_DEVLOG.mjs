import Blog from "../models/Blog";

export default function(wsm, debug, payload) {
    debug.logEvents ? console.log(`[blowjs | WebSocketManager]: A new devlog has been caught`) : 0;
    wsm.client.emit('devlog', new Blog(
        wsm.client,
        payload.blogdata['200'],
        payload.blogdata.blogid,
        payload.blogdata.blogposter_username,
        payload.blogdata.content,
        payload.blogdata.blogdate
    ));
}