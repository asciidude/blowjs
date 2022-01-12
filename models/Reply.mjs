export default class Reply {
    constructor(
        id, parentID, author, content, locked, nsfw, edited, createdAt
    ) {
        this.id = id;
        this.parentID = parentID;
        this.author = author;
        this.content = content;
        this.nsfw = nsfw;
        this.edited = edited === null ? false : edited;
        this.createdAt = new Date(createdAt);
    }
}