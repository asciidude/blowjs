export default function(wsm, debug, payload) {
    debug.logEvents ? console.log(`[blowjs | WebSocketManager]: A new like has been caught`) : 0;
    wsm.client.emit('like', payload.type, payload.userdata);
}