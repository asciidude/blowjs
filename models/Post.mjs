export default class Post {
    constructor(
        id, author, content, locked, nsfw, edited, createdAt, replies
    ) {
        this.id = id;
        this.author = author;
        this.locked = locked;
        this.content = content;
        this.nsfw = nsfw;
        this.edited = edited === null ? false : edited;
        this.createdAt = new Date(createdAt);
        this.replies = [];

        if(replies != null) {
            for(const reply of replies) {
                if(replies.length == 0) return this.replies = null;
    
                this.replies.push(
                    new Reply(
                        reply.replyid,
                        reply.postid,
                        reply.username,
                        reply.content,
                        reply.rnsfw,
                        reply.edited,
                        reply.reply_date
                    )
                )
            }
        } else {
            this.replies = null;
        }
    }
}