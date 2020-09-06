import axios, { AxiosError } from "axios"
import IRoom from "../interfaces/Room"
import LOBBY_API_MAP from "./LobbyApiMap"
import ClientError from "./ClientError"

export default class LobbyApi {
    static async newPlayer(playerName: string): Promise<boolean> {
        const config = LOBBY_API_MAP.PLAYER.CREATE_PLAYER(playerName)
        try {
            const response = await axios.request(config)
            return response.data.playerId !== undefined
        }
        catch (ex) {
            const error: AxiosError = ex
            throw new ClientError(
                error.response?.status,
                error.response?.data
            )
        }
    }
    static async getPlayer(): Promise<{playerId: string, playerName: string}> {
        const config = LOBBY_API_MAP.PLAYER.GET_PLAYER()
        try {
            const response = await axios.request(config)
            return response.data.player
        }
        catch (ex) {
            const error: AxiosError = ex
            throw new ClientError(
                error.response?.status, 
                error.response?.data
            )
        }
    }
    static async clearPlayer(): Promise<boolean> {
        const config = LOBBY_API_MAP.PLAYER.CLEAR_PLAYER()
        try {
            const response = await axios.request(config)
            return response.data.playerId !== undefined
        }
        catch (ex) {
            const error: AxiosError = ex
            throw new ClientError(
                error.response?.status, 
                error.response?.data
            )
        }
    }
    static async newRoom(): Promise<string> {
        const config = LOBBY_API_MAP.ROOM.CREATE_ROOM()
        try {
            const response = await axios.request(config)
            return response.data.roomId
        }
        catch (ex) {
            const error: AxiosError = ex
            throw new ClientError(
                error.response?.status, 
                error.response?.data
            )
        }
    }

    static async getRoomPlayerNames(roomId: string): Promise<string[]> {
        const config = LOBBY_API_MAP.ROOM.GET_PLAYER_NAMES(roomId)
        try {
            const response = await axios.request(config)
            return response.data.playerNames
        }
        catch (ex) {
            const error: AxiosError = ex
            throw new ClientError(
                error.response?.status, 
                error.response?.data
            )
        }
    }

    static async joinRoom(roomId: string): Promise<string>{
        const config = LOBBY_API_MAP.ROOM.JOIN_ROOM(roomId)
        try {
            const response = await axios.request(config)
            return response.data.roomId
        }
        catch (ex) {
            const error: AxiosError = ex
            throw new ClientError(
                error.response?.status, 
                error.response?.data
            )
        }
    }
    
    static async getPlayerRooms(): Promise<string[]> {
        const config = LOBBY_API_MAP.PLAYER.GET_ROOMS()
        try {
            const response = await axios.request(config)
            return response.data.rooms
        }
        catch (ex) {
            const error: AxiosError = ex
            throw new ClientError(
                error.response?.status, 
                error.response?.data
            )
        }
    }
    static async getRoomLeader(roomId: string): Promise<string> {
        const config = LOBBY_API_MAP.ROOM.GET_LEADER(roomId)
        try {
            const response = await axios.request(config)
            return response.data.leader
        }
        catch (ex) {
            const error: AxiosError = ex
            throw new ClientError(
                error.response?.status, 
                error.response?.data
            )
        }
    }
    static async getRoomGame(roomId: string): Promise<{id: string, name: string}>
    {
        const config = LOBBY_API_MAP.ROOM.GET_GAME(roomId)
        try {
            const response = await axios.request(config)
            return response.data.game
        }
        catch (ex) {
            const error: AxiosError = ex
            throw new ClientError(
                error.response?.status, 
                error.response?.data
            )
        }
    }
    static async getRoom(roomId: string): Promise<IRoom> {
        const config = LOBBY_API_MAP.ROOM.GET_ROOM(roomId)

        try {
            const response = await axios.request(config)
            return response.data.room
        }
        catch (ex) {
            const error: AxiosError = ex
            throw new ClientError(
                error.response?.status, 
                error.response?.data
            )
        }
    }
    static async getAvailableGames(): Promise<string[]> {
        const config = LOBBY_API_MAP.ROOM.GET_AVAILABLE_GAMES()

        try {
            const response = await axios.request(config)
            return response.data.games
        }
        catch (ex) {
            const error: AxiosError = ex
            throw new ClientError(
                error.response?.status,
                error.response?.data
            )
        }
    }
    static async createGame(roomId: string, gameName: string): Promise<string> {
        const config = LOBBY_API_MAP.ROOM.CREATE_GAME(roomId, gameName)

        try {
            const response = await axios.request(config)
            return response.data.gameId
        }
        catch (ex) {
            const error: AxiosError = ex
            throw new ClientError(
                error.response?.status,
                error.response?.data
            )
        }
    }
    static listenToUpdateEvent() {
        const [url,init] = LOBBY_API_MAP.ROOM.UPDATES()
        return new EventSource(url, init)
    }
}