import LobbyApi from '../api/LobbyApi'
import ClubSessionStorage from './SessionStorage'

export default class ClubSession {
    static populateSession() {
        LobbyApi.getPlayer().then((player) => {
            if (player) {
                ClubSessionStorage.setPlayerId(player.playerId)
                ClubSessionStorage.setPlayerName(player.playerName)
                window.location.reload()
            }
        })
    }
    static getPlayerId() {
        return ClubSessionStorage.getPlayerId()
    }
    static getPlayerName() {
        return ClubSessionStorage.getPlayerName()
    }
    static clearSession() {
        LobbyApi.clearPlayer().then(() => {
            ClubSessionStorage.removePlayerId()
            ClubSessionStorage.removePlayerName()
            window.location.reload()
        })
    }
}