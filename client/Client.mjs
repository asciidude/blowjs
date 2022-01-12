import WebSocketManager from '../ws/WebSocketManager.mjs';
import EventEmitter from 'events';

export default class Client extends EventEmitter {
    constructor() {
        super();
        this.ws = new WebSocketManager(this);
    }

    user;
    async login(token) {
        await this.ws.connect(token);
        this.emit('ready');
    }
}