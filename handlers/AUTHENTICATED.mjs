import fetch from 'node-fetch';
import { Constants } from '../constants/Constants.mjs';
import ClientUser from '../client/ClientUser.mjs';

export default async function(wsm, debug, payload) {
    wsm.client.emit('ready');

    setInterval(() => {
        wsm.sendHeartbeat();
    }, payload.heartbeatinterval || 40000);
}