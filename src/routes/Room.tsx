import React from 'react'
import { RouteComponentProps, match } from 'react-router-dom'
import LobbyApi from '../engine/api/LobbyApi'
import PlayerList from '../components/PlayerList'
import ClubSession from '../utils/ClubSession'
import JoinButton from '../components/Room/JoinButton'
import ShareButton from '../components/Room/ShareButton'
import LoginModal from '../components/Login/LoginModal'
import RoomGame from '../components/Room/RoomGame'
import ClientError from '../engine/api/ClientError'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles({
    room: {
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '1%',
        width: 'max-content',
        textAlign: 'left',
        borderRadius: '10px',
        borderStyle: 'groove',
        borderWidth: 'thick',
        padding: '2vmax',
        borderColor: 'rgb(0, 102, 153)',
    },
    bold: {
        fontWeight: 'bold'
    },
    toTheRight: {
        textAlign: 'right'
    },
    block: {
        display: 'block'
    }
})


interface IRouteParams {
    id: string
}
interface IRoomProps extends RouteComponentProps<IRouteParams> {
    match: match<IRouteParams>
}
interface IRoomState {
    players: string[]
    leader: string
    gameName: string
    gameId: string
}
const Room: React.FC<IRoomProps> = (props) => {
    const classes = useStyles()
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

    const fetchDataToState = React.useCallback(() => {
        LobbyApi.getRoom(roomId).then((room) => {
            if (room) {
                setRoom(room)
            }
        }).catch((error: ClientError) => {
            // TODO: Handle better
            console.error(`${error.httpStatusCode}: ${error.message}`)
        })
    }, [roomId])

    React.useEffect(() => {
        LobbyApi.listenToUpdateEvent().onmessage = (event) => {
            fetchDataToState()
        }

        fetchDataToState()
    }, [fetchDataToState])

    let joinButton = <React.Fragment />
    if (!room.players.some((player) => player === ClubSession.getPlayerName())) {
        joinButton = <JoinButton roomId={roomId} />
    }
    return (
        <div className={classes.room}>
            <span className={classes.bold}>Room ID: </span>
            <span>{roomId}</span>
            <div className={classes.toTheRight}>
                <ShareButton targetUrl={document.URL} />
            </div>
            <p className={`${classes.bold} ${classes.block}`}>Players in this room:</p>
            <PlayerList players={room.players} />
            {joinButton}
            <RoomGame
                roomLeaderId={room.leader}
                gameId={room.gameId}
                gameName={room.gameName}
                roomId={roomId}
            />
            <LoginModal show={!isLoggedIn} />
        </div>
    )
}

export default Room