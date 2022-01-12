export default function(wsm, debug, payload) {
    debug.logEvents ? console.log(`[blowjs | WebSocketManager]: A new reply has been caught`) : 0;
    wsm.client.emit('reply', payload.replydata, payload.postid);
}