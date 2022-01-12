import { Constants } from "../constants/Constants.mjs";

export default function(wsm, debug, payload) {
    return wsm.ws.send(JSON.stringify({
        'message': 'SEND_TOKEN',
        'token': wsm.token,
        'version': Constants.API_VERSION
    }));
}