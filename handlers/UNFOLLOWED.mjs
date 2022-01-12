export default function(wsm, debug, payload) {
    debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Someone has unfollowed you`) : 0;
    wsm.client.emit('unfollow', payload.userdata);
}