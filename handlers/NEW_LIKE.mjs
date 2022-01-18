import { User } from "../index.mjs";

export default function(wsm, debug, payload) {
    debug.logEvents ? console.log(`[blowjs | WebSocketManager]: A new like has been caught`) : 0;
    wsm.client.emit('like', new User(
        wsm.ws.client,
        payload.userdata['200'],
        payload.userdata.uuid,
        payload.userdata.username,
        payload.userdata.displayname,
        payload.userdata.pfp,
        payload.userdata.banner,
        payload.userdata.coins,
        payload.userdata.rank,
        payload.userdata.eventr,
        payload.userdata.patreon,
        payload.userdata.booster,
        payload.userdata.bio,
        payload.userdata.nsfw,
        payload.userdata.pronoun,
        payload.userdata.ban,
        payload.userdata.created_at,
        payload.userdata.last_posted,
        payload.userdata.posts
    ), payload.type);
}