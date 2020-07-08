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
    roomId: string
    gameName: string
    gameId: string
    isLoggedIn: boolean
}
export default class Room extends React.PureComponent<IRoomProps,IRoomState>{
    constructor(props: IRoomProps) {
        super(props)

        this.state = {
            players: [],
            leader: "",
            roomId: props.match.params.id,
            gameName: "",
            gameId: "",
            isLoggedIn: ClubSession.getPlayerId() !== null
        }
    }
    componentDidMount() {
        LobbyApi.listenToUpdateEvent().onmessage = (event) => {
            this.fetchDataToState()
        }
        this.fetchDataToState()
    }
    render() {
        let joinButton = <React.Fragment/>
        if (!this.state.players.some((player) => player === ClubSession.getPlayerName()))
        {
            joinButton = <JoinButton roomId={this.props.match.params.id} />
        }
        return (
            <div className="centered-relative room">
                <span className="bold">Room ID: </span>
                <span>{this.props.match.params.id}</span>
                <div className="align-right">
                    <ShareButton targetUrl={document.URL} />
                </div>
                <p className="block bold">Players in this room:</p>
                <PlayerList players={this.state.players} />
                {joinButton}
                <RoomGame 
                    roomLeaderId={this.state.leader}
                    gameId={this.state.gameId} 
                    gameName={this.state.gameName}
                    roomId={this.state.roomId}
                    gameNames={["wizard"]}
                />
                <LoginModal show={!this.state.isLoggedIn} />
            </div>
        )
    }

    fetchDataToState() {
        LobbyApi.getRoom(this.state.roomId).then((room) => {
            if (room)
                this.setState(() => ({
                    leader: room.leader,
                    gameName: room.gameName,
                    gameId: room.gameId
                }))
        }).catch((error: ClientError) => {
            // TODO: Handle better
            console.error(`${error.httpStatusCode}: ${error.message}`)
        })
        LobbyApi.getRoomPlayerNames(this.state.roomId).then((playerNames) => {
            this.setState(() => ({players: playerNames}))
        }).catch((error: ClientError) => {
            // TODO: Handle better
            console.error(`${error.httpStatusCode}: ${error.message}`)
        })

    }
}