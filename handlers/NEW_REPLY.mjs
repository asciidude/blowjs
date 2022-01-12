import Reply from "../models/Reply.mjs";

export default function(wsm, debug, payload) {
    debug.logEvents ? console.log(`[blowjs | WebSocketManager]: A new reply has been caught`) : 0;
    wsm.client.emit('reply', new Reply(
        payload.replydata.replyid,
        payload.replydata.postid,
        payload.replydata.username,
        payload.replydata.content,
        payload.replydata.locked,
        payload.replydata.rnsfw,
        payload.replydata.edited,
        payload.replydata.post_date
    ));
}