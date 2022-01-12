export default function(client, wsm, debug, payload) {
    setInterval(() => {
        wsm.sendHeartbeat();
    }, 40000);
}