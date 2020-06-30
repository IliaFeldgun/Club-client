export default class SessionStorage {
    static getPlayerId() {
        return sessionStorage.getItem("playerId")
    }
    static getPlayerName() { 
        return sessionStorage.getItem("playerName")
    }
    static setPlayerId(id: string) {
        sessionStorage.setItem("playerId", id)
    }
    static setPlayerName(name: string) {
        sessionStorage.setItem("playerName", name)
    }
}