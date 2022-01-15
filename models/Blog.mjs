import fetch from "node-fetch";
import { Constants } from "../constants/Constants.mjs";

export default class Blog {
    constructor(
        client, found, id, poster, content, createdAt
    ) {
        this.found = found == "latest Blog Post" ? true : false;
        this.id = id;
        this.poster = poster;
        this.content = content;
        this.createdAt = new Date(createdAt);

        this.client = client;
    }

    /**
     * Returns the latest blog post
     * @returns latest blog post
     */
    async getLatest() {
        let params = new URLSearchParams();
        params.append('token', this.client.ws.token);

        const blog = await fetch(`${Constants.API_URL}/blog/latest`, {
            method: 'POST',
            body: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(r => r.json());

        return new Blog(
            this.client,
            blog['200'],
            blog.blogid,
            blog.blogposter_username,
            blog.blogcontent,
            blog.blogdate
        );
    }
}