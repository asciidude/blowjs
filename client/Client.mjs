import WebSocketManager from '../ws/WebSocketManager.mjs';
import EventEmitter from 'events';
import Post from '../models/Post.mjs';
import Reply from '../models/Reply.mjs';

export default class Client extends EventEmitter {
    constructor() {
        super();
        this.ws = new WebSocketManager(this);
        this.posts = new Post(this);
        this.replies = new Reply(this);
    }

    async login(token) {
        await this.ws.connect(token);
    }
}