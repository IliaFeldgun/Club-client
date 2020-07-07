import LobbyApi from '../../api/LobbyApi'
import axios from 'axios'
import EMPTY_UUID from '../../utils/EMPTY_UUID'
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("Testing lobby API access", () => {
    test("Player creation", async () => {
        mockedAxios.request.mockImplementationOnce(() => Promise.resolve({
            data: {
                playerId: EMPTY_UUID
        }}))
        expect(await LobbyApi.newPlayer("testPlayer123")).toBe(true)
    })
})