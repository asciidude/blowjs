import WebSocket from 'ws';
import { Constants } from '../constants/Constants.mjs';

export const debug = {
    logEvents: false
}

export default class WebSocketManager {
    constructor(client) {
        this.client = client;
        this.ws = new WebSocket(Constants.WS_URL);
    }

    async sendHeartbeat() {
        debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Sending heartbeat to Bubblez API`) : 0;
        this.ws.send(JSON.stringify({ 'message': 'HEARTBEAT' }));
        debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Heartbeat sent`) : 0;
    }

    async connect(token) {
        if(!token) throw Error(`[blowjs | WebSocketManager]: No token has been provided`);

        try {
            this.ws.on('open', () => {
                debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Successfully logged into the Bubblez API`) : 0;
            });

            this.ws.on('message', (data) => {
                let payload = JSON.parse(data.toString());
                
                switch(payload.message) {
                    case "AUTHENTICATION_REQUIRED":
                        this.ws.send(JSON.stringify({
                            'message': 'SEND_TOKEN',
                            'token': token,
                            'version': Constants.API_VERSION
                        }));
                        
                        break;

                    case "AUTHENTICATED":
                        this.sendHeartbeat();
                        break;

                    case "HEARTBEAT_MISSED":
                        this.sendHeartbeat();
                        break;
                }
            });
        } catch(err) {
            console.error(`[blowjs | WebSocketManager]:\n${err}`);
        }
    }
}