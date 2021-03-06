import LobbyApi from '../engine/api/LobbyApi'
import ClubSessionStorage from './SessionStorage'
import ClientError from '../engine/api/ClientError'

export default class ClubSession {
    static assertSession() {
        LobbyApi.getPlayer().then((player) => {
            if (player) {
                ClubSession.populateSession(player.playerId, player.playerName)
            }
            else {
                ClubSession.clearSession()
            }
        }).catch((error) => {
            ClubSession.clearSession()
        })
    }
    private static populateSession(playerId: string, playerName: string) {
        const isSessionInitialized = 
            playerId === ClubSession.getPlayerId() &&
            playerName === ClubSession.getPlayerName()
        
        if (!isSessionInitialized) {
            ClubSessionStorage.setPlayerId(playerId)
            ClubSessionStorage.setPlayerName(playerName)
            window.location.reload()
        }
    }
    static getPlayerId() {
        return ClubSessionStorage.getPlayerId()
    }
    static getPlayerName() {
        return ClubSessionStorage.getPlayerName()
    }
    static killSession() {
        LobbyApi.clearPlayer().then(() => {
            ClubSession.clearSession()
        }).catch((error: ClientError) => {
            // TODO: Handle better
            console.error(`${error.httpStatusCode}: ${error.message}`)
        })
    }
    static clearSession() {
        const isSessionEmpty = 
            ClubSession.getPlayerName() === null &&
            ClubSession.getPlayerId() === null
        if (!isSessionEmpty) {
            ClubSessionStorage.removePlayerId()
            ClubSessionStorage.removePlayerName()
            window.location.reload()
        }
    }
}