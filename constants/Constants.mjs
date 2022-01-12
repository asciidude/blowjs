/* https://bubblez.app/api/v1/ */

export const Constants = {
    WS_URL: 'wss://ws.bubblez.app/live',
    API_URL: null,
    CANARY_URL: 'wss://ws.bubblez.app/canary',
    API_VERSION: 1
}

Constants.API_URL = `https://bubblez.app/api/v${Constants.API_VERSION}`