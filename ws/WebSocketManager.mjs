import WebSocket from 'ws';
import EventEmitter from 'events';
import { Constants } from '../constants/Constants.mjs';

export const debug = {
    logEvents: false
}

export default class WebSocketManager extends EventEmitter {
    constructor(client) {
        super();
        this.client = client;
        this.ws = new WebSocket(Constants.WS_URL);
        
        this.connection_start = null;
        this.connection_end = null;
    }

    async sendHeartbeat() {
        debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Sending heartbeat to Bubblez API`) : 0;
        this.ws.send(JSON.stringify({ 'message': 'HEARTBEAT' }));
        debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Heartbeat sent`) : 0;
    }

    async connect(token) {
        if(!token) throw `[blowjs | WebSocketManager]: No token has been provided`;

        try {
            this.ws.on('open', () => {
                debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Websocket opened`) : 0;
                this.connection_start = Date.now();
            });

            this.ws.on('message', (data) => {
                const payload = JSON.parse(data.toString());
                const { message } = payload;

                switch(message) {
                    case 'AUTHENTICATION_REQUIRED':
                        this.ws.send(JSON.stringify({
                            'message': 'SEND_TOKEN',
                            'token': token,
                            'version': Constants.API_VERSION
                        }));
                        break;

                    case 'AUTHENTICATED':
                        setInterval(() => {
                            this.sendHeartbeat();
                        }, 40000);
                        break;

                    case 'HEARTBEAT_MISSED':
                        debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Heartbeat missed! Sending another heartbeat`) : 0;
                        this.sendHeartbeat();
                        break;

                    case 'HEARTBEAT_ACK':
                        debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Heartbeat has been acknowledged`) : 0;
                        break;
                }
            });

            this.ws.on('close', (code) => {
                this.connection_end = Date.now();
                debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Websocket closed on code ${code} and lasted ${this.connection_end - this.connection_start}ms`) : 0;
                this.emit('close', code);
                
                if(code == 4004) throw `[blowjs | WebSocketManager]: The token provided was invalid`;
            });

            process.once('SIGINT', async () => {
                debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Process interrupt signal recieved, closing`) : 0;
                await process.exit();
            })
        } catch(err) {
            console.error(`[blowjs | WebSocketManager]:\n${err}`);
        }
    }
}