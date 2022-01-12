export default function(wsm, debug, payload) {
    debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Heartbeat missed! Sending another heartbeat`) : 0;
    wsm.sendHeartbeat();
}