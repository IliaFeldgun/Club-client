import LobbyApi from '../../../engine/api/LobbyApi'
import axios from 'axios'
import EMPTY_UUID from '../../../utils/EMPTY_UUID'
import ClientError from '../../../engine/api/ClientError'
import IRoom from '../../../engine/interfaces/Room'
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("Testing lobby API access", () => {
    const errorMessage = "API server error"
    const errorStatus = 500
    beforeAll(() => {
        mockedAxios.request.mockRejectedValue({
            response: {
                status: errorStatus,
                data: errorMessage
            }
        })
    })
    describe("Player creation", () => {
        test("Player creation", async () => {
            mockedAxios.request.mockResolvedValueOnce({
                data: {
                    playerId: EMPTY_UUID
                }
            })
            expect(await LobbyApi.newPlayer("testPlayer123")).toBe(true)
        })
        test("Player creation fails", async () => {
            try {
                await LobbyApi.newPlayer("testPlayer123")
            }
            catch (ex) {
                const error: ClientError = ex
                expect(error.httpStatusCode).toBe(errorStatus)
                expect(error.message).toBe(errorMessage)
            }
        })
    })
    describe("Player retrieval", () => {
        test("Player retrieval", async () => {
            const player = {
                playerId: EMPTY_UUID,
                playerName: "testPlayer123"
            }
            mockedAxios.request.mockResolvedValueOnce({
                data: {
                    player
                }
            })
            expect(await LobbyApi.getPlayer()).toEqual(player)
        })
        test("Player retrieval fails", async () => {
            try {
                await LobbyApi.getPlayer()
            }
            catch (ex) {
                const error: ClientError = ex
                expect(error.httpStatusCode).toBe(errorStatus)
                expect(error.message).toBe(errorMessage)
            }
        })
    })
    describe("Player clear", () => {
        test("Player clear", async () => {
            mockedAxios.request.mockResolvedValueOnce({
                data: {
                    playerId: EMPTY_UUID
                }
            })
            expect(await LobbyApi.clearPlayer()).toBe(true)
        })
        test("Player clear fails", async () => {
            try {
                await LobbyApi.clearPlayer()
            }
            catch (ex) {
                const error: ClientError = ex
                expect(error.httpStatusCode).toBe(errorStatus)
                expect(error.message).toBe(errorMessage)
            }
        })
    })
    describe("Room creation", () => {
        test("Room creation", async () => {
            const roomId = EMPTY_UUID
            mockedAxios.request.mockResolvedValueOnce({
                data: {
                    roomId
                }
            })
            expect(await LobbyApi.newRoom()).toBe(roomId)
        })
        test("Room creation fails", async () => {
            try {
                await LobbyApi.newRoom()
            }
            catch (ex) {
                const error: ClientError = ex
                expect(error.httpStatusCode).toBe(errorStatus)
                expect(error.message).toBe(errorMessage)
            }
        })
    })
    describe("Room player names retrieval", () => {
        test("Room player names retrieval", async () => {
            const playerNames = ["Woman", "Who-man", "Hooman"]
            mockedAxios.request.mockResolvedValueOnce({
                data: {
                    playerNames
                }
            })
            expect(await LobbyApi.getRoomPlayerNames(EMPTY_UUID)).toEqual(playerNames)
        })
        test("Room player names retrieval fails", async () => {
            try {
                await LobbyApi.getRoomPlayerNames(EMPTY_UUID)
            }
            catch (ex) {
                const error: ClientError = ex
                expect(error.httpStatusCode).toBe(errorStatus)
                expect(error.message).toBe(errorMessage)
            }
        })
    })
    describe("Room join", () => {
        test("Room join", async () => {
            const roomId = EMPTY_UUID
            mockedAxios.request.mockResolvedValueOnce({
                data: {
                    roomId
                }
            })
            expect(await LobbyApi.joinRoom(roomId)).toBe(roomId)
        })
        test("Room join fails", async () => {
            try {
                await LobbyApi.joinRoom(EMPTY_UUID)
            }
            catch (ex) {
                const error: ClientError = ex
                expect(error.httpStatusCode).toBe(errorStatus)
                expect(error.message).toBe(errorMessage)
            }
        })
    })
    describe("Player rooms retrieval", () => {
        test("Player rooms retrieval", async () => {
            const rooms = [EMPTY_UUID, EMPTY_UUID, EMPTY_UUID]
            mockedAxios.request.mockResolvedValueOnce({
                data: {
                    rooms
                }
            })
            expect(await LobbyApi.getPlayerRooms()).toEqual(rooms)
        })
        test("Player rooms retrieval fails", async () => {
            try {
                await LobbyApi.getPlayerRooms()
            }
            catch (ex) {
                const error: ClientError = ex
                expect(error.httpStatusCode).toBe(errorStatus)
                expect(error.message).toBe(errorMessage)
            }
        })
    })
    describe("Room leader retrieval", () => {
        test("Room leader retrieval", async () => {
            const leader = EMPTY_UUID
            mockedAxios.request.mockResolvedValueOnce({
                data: {
                    leader
                }
            })
            expect(await LobbyApi.getRoomLeader(EMPTY_UUID)).toBe(leader)
            
        })
        test("Room leader retrieval fails", async () => {
            try {
                await LobbyApi.getRoomLeader(EMPTY_UUID)
            }
            catch (ex) {
                const error: ClientError = ex
                expect(error.httpStatusCode).toBe(errorStatus)
                expect(error.message).toBe(errorMessage)
            }
        })
    })
    describe("Room game retrieval", () => {
        test("Room game retrieval", async () => {
            const game = {
                id: EMPTY_UUID,
                name: "Wizard"
            }
            mockedAxios.request.mockResolvedValueOnce({
                data: {
                    game
                }
            })
            expect (await LobbyApi.getRoomGame(EMPTY_UUID)).toEqual(game)
        })
        test("Room game retrieval fails", async () => {
            try {
                await LobbyApi.getRoomGame(EMPTY_UUID)
            }
            catch (ex) {
                const error: ClientError = ex
                expect(error.httpStatusCode).toBe(errorStatus)
                expect(error.message).toBe(errorMessage)
            }
        })
    })
    describe("Room retrieval", () => {
        test("Room retrieval", async () => {
            const room : IRoom = {
                gameId: EMPTY_UUID,
                gameName: "Wizard",
                id: EMPTY_UUID,
                leader: EMPTY_UUID,
                players: [EMPTY_UUID, EMPTY_UUID, EMPTY_UUID]
            }
            mockedAxios.request.mockResolvedValueOnce({
                data: {
                    room
                }
            })
            expect(await LobbyApi.getRoom(EMPTY_UUID)).toEqual(room)
        })
        test("Room retrieval fails", async () => {
            try {
                await LobbyApi.getRoom(EMPTY_UUID)
            }
            catch (ex) {
                const error: ClientError = ex
                expect(error.httpStatusCode).toBe(errorStatus)
                expect(error.message).toBe(errorMessage)
            }
        })
    })
})