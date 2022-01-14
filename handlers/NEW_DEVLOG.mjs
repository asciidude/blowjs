export default function(wsm, debug, payload) {
    debug.logEvents ? console.log(`[blowjs | WebSocketManager]: A new devlog has been caught`) : 0;
    wsm.client.emit('devlog', new Blog(
        ws.client,
        payload.blogdata
    ));
}