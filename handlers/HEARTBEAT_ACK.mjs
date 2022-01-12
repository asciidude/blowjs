export default function(client, wsm, debug, payload) {
    debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Heartbeat has been acknowledged`) : 0;
}