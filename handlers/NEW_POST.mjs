export default function(wsm, debug, payload) {
    debug.logEvents ? console.log(`[blowjs | WebSocketManager]: A new post has been caught`) : 0;
    wsm.client.emit('post', payload.postdata);
}