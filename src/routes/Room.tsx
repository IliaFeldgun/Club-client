import React from 'react'
import { RouteComponentProps, match } from 'react-router-dom'
import LobbyApi from '../engine/api/LobbyApi'
import PlayerList from '../components/PlayerList'
import "./Room.css"
import ClubSession from '../utils/ClubSession'
import JoinButton from '../components/Room/JoinButton'
import ShareButton from '../components/Room/ShareButton'
import LoginModal from '../components/Login/LoginModal'
import RoomGame from '../components/Room/RoomGame'
import ClientError from '../engine/api/ClientError'

interface IRouteParams {
    id: string
}
interface IRoomProps extends RouteComponentProps<IRouteParams>{
    match: match<IRouteParams>
}
interface IRoomState {
    players: string[]
    leader: string
    gameName: string
    gameId: string
}
const Room: React.FC<IRoomProps> = (props) => {
    const roomId = props.match.params.id
    const [room, setRoom] = React.useState<IRoomState>({
        players: [],
        leader: "",
        gameName: "",
        gameId: ""
    })
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)

    React.useEffect(() => {
        setIsLoggedIn(ClubSession.getPlayerId() !== null)
    }, [])

    React.useEffect(() => {
        // TODO: Maybe move this out of here
        const fetchDataToState = () => {
            LobbyApi.getRoom(roomId).then((room) => {
                if (room) {
                    setRoom(room)
                }
            }).catch((error: ClientError) => {
                // TODO: Handle better
                console.error(`${error.httpStatusCode}: ${error.message}`)
            })
        }

        LobbyApi.listenToUpdateEvent().onmessage = (event) => {
            fetchDataToState()
        }

        fetchDataToState()
    }, [roomId])
    
    let joinButton = <React.Fragment/>
    if (!room.players.some((player) => player === ClubSession.getPlayerName()))
    {
        joinButton = <JoinButton roomId={roomId} />
    }
    return (
        <div className="centered-relative room">
            <span className="bold">Room ID: </span>
            <span>{roomId}</span>
            <div className="align-right">
                <ShareButton targetUrl={document.URL} />
            </div>
            <p className="block bold">Players in this room:</p>
            <PlayerList players={room.players} />
            {joinButton}
            <RoomGame 
                roomLeaderId={room.leader}
                gameId={room.gameId} 
                gameName={room.gameName}
                roomId={roomId}
                gameNames={["wizard"]}
            />
            <LoginModal show={!isLoggedIn} />
        </div>
    )
}

export default Room