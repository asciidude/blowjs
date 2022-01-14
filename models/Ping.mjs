export default class Ping {
    constructor(
        client, found, username, onlineStatus
    ) {
        this.found = found == "Pong" ? true : false;
        this.username = username;
        this.onlineStatus = onlineStatus;

        this.client = client;
    }
}