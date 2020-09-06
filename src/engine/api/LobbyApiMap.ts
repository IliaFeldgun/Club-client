import { AxiosRequestConfig } from 'axios'

const API_ENPOINT = process.env.REACT_APP_CLUB_API_SERVER

function GET_CONFIG(url: string): AxiosRequestConfig {
    return {
        url,
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        withCredentials: true
    }
}
function POST_CONFIG(url: string): AxiosRequestConfig {
    return {
        url,
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        withCredentials: true
    }
}
function DELETE_CONFIG(url: string): AxiosRequestConfig {
    return {
        url,
        method: "DELETE",
        headers: {
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

const LOBBY_API_MAP = {
    ROOM: {
        GET_ROOM: (roomId: string) => {
            const url = `${API_ENPOINT}/api/room/${roomId}`
            return GET_CONFIG(url)
        },
        CREATE_ROOM: () => {
            const url = `${API_ENPOINT}/api/room`
            return POST_CONFIG(url)
        },
        JOIN_ROOM: (roomId: string) => {
            const url = `${API_ENPOINT}/api/room/${roomId}/join`
            return POST_CONFIG(url)
        },
        GET_LEADER: (roomId: string) => {
            const url = `${API_ENPOINT}/api/room/${roomId}/leader`
            return GET_CONFIG(url)
        },
        GET_PLAYER_NAMES: (roomId: string) => {
            const url = `${API_ENPOINT}/api/room/${roomId}/playernames`
            return GET_CONFIG(url)
        },
        GET_GAME: (roomId: string) => {
            const url = `${API_ENPOINT}/api/room/${roomId}/game`
            return GET_CONFIG(url)
        },
        GET_AVAILABLE_GAMES: () => {
            const url = `${API_ENPOINT}/api/room/games`
            return GET_CONFIG(url)
        },
        CREATE_GAME: (roomId: string, gameName: string) => {
            const url = `${API_ENPOINT}/api/room/${roomId}/game/${gameName}`
            return POST_CONFIG(url)
        },
        UPDATES: (): [string, EventSourceInit] => {
            const url = `${API_ENPOINT}/api/room/updates`
            const config = EVENT_SOURCE_INIT()
            return [url, config]
        }
    },
    PLAYER: {
        GET_ROOMS: () => {
            const url = `${API_ENPOINT}/api/player/rooms`
            return GET_CONFIG(url)
        },
        CREATE_PLAYER: (playerName: string) => {
            const url = `${API_ENPOINT}/api/player`
            return { ...POST_CONFIG(url), data: { playerName } }
        },
        GET_PLAYER: () => {
            const url = `${API_ENPOINT}/api/player`
            return GET_CONFIG(url)
        },
        CLEAR_PLAYER: () => {
            const url = `${API_ENPOINT}/api/player`
            return DELETE_CONFIG(url)
        }
    }
}

export default LOBBY_API_MAP
