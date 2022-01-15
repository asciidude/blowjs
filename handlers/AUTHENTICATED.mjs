export default async function(wsm, debug, payload) {
    wsm.client.emit('ready');

    setInterval(() => {
        wsm.sendHeartbeat();
    }, payload.heartbeatinterval || 40000);
}