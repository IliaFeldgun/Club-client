import { AxiosRequestConfig } from 'axios'
import ICard from '../../interfaces/Card'

const API_ENPOINT = process.env.REACT_APP_CLUB_API_SERVER

// functions are to avoid cloning
function POST_CONFIG(): AxiosRequestConfig {
    return {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        },
        withCredentials: true
    }
}
function GET_CONFIG(): AxiosRequestConfig {
    return {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        withCredentials: true
    }
}
function EVENT_SOURCE_INIT(): EventSourceInit {
    return {
        withCredentials: true
    }
}
const WIZ_API_MAP = {
    GET_GAME_INSTRUCTIONS: {
        url: (gameId: string) => {
            return `${API_ENPOINT}/api/game/wizard/${gameId}`
        },
        config: GET_CONFIG
    },
    GET_GAME_PLAYERS: {
        url: (gameId: string) => {
            return `${API_ENPOINT}/api/game/wizard/${gameId}/players`
        },
        config: GET_CONFIG
    },
    GET_NEXT_PLAYER: {
        url: (gameId: string) => {
            return `${API_ENPOINT}/api/game/wizard/${gameId}/nextplayer`
        },
        config: GET_CONFIG
    },
    GET_PLAYER_HAND: {
        url: (gameId: string) => {
            return `${API_ENPOINT}/api/game/wizard/${gameId}/hand`
        },
        config: GET_CONFIG
    },
    GET_TABLE_STACK: {
        url: (gameId: string) => {
            return `${API_ENPOINT}/api/game/wizard/${gameId}/stack`
        },
        config: GET_CONFIG
    },
    GET_STRONG_SUIT: {
        url: (gameId: string) => {
            return `${API_ENPOINT}/api/game/wizard/${gameId}/kozer`
        },
        config: GET_CONFIG
    },
    SEND_CARD: {
        url: (gameId: string) => {
            return `${API_ENPOINT}/api/game/wizard/${gameId}/play`
        },
        config: (card: ICard) => {
            return {...POST_CONFIG(), data: JSON.stringify(card)}
        }
    },
    SEND_BET: {
        url: (gameId: string, bet: number) => {
            return `${API_ENPOINT}/api/game/wizard/${gameId}/bet/${bet}`
        },
        config: POST_CONFIG
    },
    UPDATES: {
        url: (gameId: string) => {
            return `${API_ENPOINT}/api/game/wizard/${gameId}/updates`
        },
        config: EVENT_SOURCE_INIT
    }
}

export default WIZ_API_MAP