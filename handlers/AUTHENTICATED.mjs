import fetch from 'node-fetch';
import User from '../models/User.mjs';
import { Constants } from '../constants/Constants.mjs';

export default async function(wsm, debug, payload) {
    let params = new URLSearchParams();
    params.append('token', wsm.token);

    const user = await fetch(`${Constants.API_URL}/user/check`, {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(r => r.json());
    
    wsm.client.emit('ready', new User(
        wsm.client,
        user['200'],
        user.uuid,
        user.username,
        user.displayname,
        user.email,
        user.pfp,
        user.banner,
        user.coins,
        user.rank,
        user.eventr,
        user.patreon,
        user.booster,
        user.bio,
        user.nsfw,
        user.dob,
        user.pronoun,
        user.ban,
        user.created_at,
        user.last_posted,
        user.posts,
        user.replies
    ));
    
    setInterval(() => {
        wsm.sendHeartbeat();
    }, payload.heartbeatinterval || 40000);
}