import { AxiosRequestConfig } from 'axios'

const API_ENPOINT = process.env.REACT_APP_CLUB_API_SERVER

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
function POST_CONFIG(): AxiosRequestConfig {
    return {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        withCredentials: true
    }
}

const LOBBY_API_MAP = {
    ROOM: {
        GET_ROOM: {
            config: GET_CONFIG,
            url: (roomId: string) => {
                return `${API_ENPOINT}/api/room/${roomId}`
            }
        },
        CREATE_ROOM: {
            config: POST_CONFIG,
            url: () => {
                return `${API_ENPOINT}/api/room`
            }
        },
        JOIN_ROOM: {
            config: POST_CONFIG,
            url: (roomId: string) => {
                return `${API_ENPOINT}/api/room/${roomId}/join`
            }
        },
        GET_LEADER: {
            config: GET_CONFIG,
            url: (roomId: string) => {
                return `${API_ENPOINT}/api/room/${roomId}/leader`
            }
        },
        GET_PLAYER_NAMES: {
            config: GET_CONFIG,
            url: (roomId: string) => {
                return `${API_ENPOINT}/api/room/${roomId}/playernames`
            }
        },
        GET_GAME: {
            config: GET_CONFIG,
            url: (roomId: string) => {
                return `${API_ENPOINT}/api/room/${roomId}/game`
            }
        },
        UPDATES: {
            url: () => {
                return `${API_ENPOINT}/api/room/updates`
            }
        }
    },
    PLAYER: {
        GET_ROOMS: {
            config: GET_CONFIG,
            url: () => {
                return `${API_ENPOINT}/api/player/rooms`
            }
        },
        CREATE_PLAYER: {
            config: (playerName: string) => {
                return {...POST_CONFIG(), data: {playerName}}
            },
            url: () => {
                return `${API_ENPOINT}/api/player`
            },
        },
        GET_PLAYER: {
            config: GET_CONFIG,
            url: () => {
                return `${API_ENPOINT}/api/player`
            }
        }
    }
}

export default LOBBY_API_MAP
