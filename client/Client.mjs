import WebSocketManager from '../ws/WebSocketManager.mjs';
import EventEmitter from 'events';

export default class Client extends EventEmitter {
    constructor() {
        super();
        this.ws = new WebSocketManager(this);
    }

    user;
    login(token) {
        this.ws.connect(token);
    }

    set user(user) {
        this.user = user;
    }

    get user() {
        return this.user;
    }
}