export default function(wsm, debug, payload) {
    debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Someone has followed you`) : 0;
    wsm.client.emit('follow', payload.userdata);
}