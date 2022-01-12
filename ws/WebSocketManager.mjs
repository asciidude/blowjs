import WebSocket from 'ws';
import EventEmitter from 'events';
import { Constants } from '../constants/Constants.mjs';
import fetch from 'node-fetch';

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

            this.ws.on('message', async (data) => {
                const payload = JSON.parse(data.toString());

                const { message } = payload;

                if(message == 'AUTHENTICATION_REQUIRED') {
                    return this.ws.send(JSON.stringify({
                        'message': 'SEND_TOKEN',
                        'token': token,
                        'version': Constants.API_VERSION
                    }));
                }

                if(message == 'AUTHENTICATED') {
                    let params = new URLSearchParams();
                    params.append('token', token);

                    const user = await fetch(`${Constants.API_URL}/user/check`, {
                        method: 'POST',
                        body: params,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(r => r.json());
                    
                    this.client.emit('ready', user);
                
                    setInterval(() => {
                        this.sendHeartbeat();
                    }, payload.heartbeatinterval || 40000);
                
                    return;
                }

                await import(`../handlers/${message}.mjs`).then(module => module.default(this, debug, payload));
            });

            this.ws.on('close', (code) => {
                this.connection_end = Date.now();
                debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Websocket closed on code ${code} and lasted ${this.connection_end - this.connection_start}ms`) : 0;
                this.client.emit('close', code);
                
                if(code == 4004) throw `[blowjs | WebSocketManager]: The token provided was invalid`;
            });

            process.once('SIGINT', async () => {
                debug.logEvents ? console.log(`[blowjs | WebSocketManager]: Process interrupt signal recieved, closing`) : 0;
                this.client.emit('interrupt');
                await process.exit();
            })
        } catch(err) {
            console.error(`[blowjs | WebSocketManager]:\n${err}`);
        }
    }
}