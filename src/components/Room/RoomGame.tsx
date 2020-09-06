import React from 'react'
import GameDisplay from './RoomGame/GameDisplay'
import PlayButton from './RoomGame/PlayButton'
import GameDropDown from './RoomGame/GameDropDown'
import CreateGame from './RoomGame/CreateGame'
import ClubSession from '../../utils/ClubSession'
import LobbyApi from '../../engine/api/LobbyApi'

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    toTheRight: {
        textAlign: 'right'
    }
})

interface IRoomGameProps {
    roomId: string
    roomLeaderId: string
    gameName: string
    gameId: string
}
const RoomGame: React.FC<IRoomGameProps> = (props) => {
    const classes = useStyles()
    const [games, setGames] = React.useState([""])
    const [selectedGame, setSelectedGame] = React.useState("")

    React.useEffect(() => {
        LobbyApi.getAvailableGames().then((games) => {
            if (games && games.length > 0) {
                setGames(games)
            }
        }).catch((error) => {
            // TODO: handle
            console.log(error)
        })
    })
    React.useEffect(() => {
        setSelectedGame(games[0])
    }, [games])

    const handlePlay = () => {
        window.location.assign(`/${props.gameName}/${props.gameId}`)
    }

    const handleGameSelect = (gameName: string) => {
        setSelectedGame(gameName)
    }

    let toRender = <React.Fragment />
    if (props.gameName && props.gameId) {
        toRender =
            <React.Fragment>
                <GameDisplay
                    gameName={props.gameName}
                />
                <div className={classes.toTheRight}>
                    <PlayButton
                        handlePlay={handlePlay}
                    />
                </div>
            </React.Fragment>
    }
    else if (props.roomLeaderId === ClubSession.getPlayerId()) {
        toRender =
            <React.Fragment>
                <GameDropDown
                    handleSelection={handleGameSelect}
                    gameNames={games}
                />
                <div className={classes.toTheRight}>
                    <CreateGame
                        roomId={props.roomId}
                        gameName={selectedGame}
                    />
                </div>
            </React.Fragment>
    }
    return (
        <div>
            {toRender}
        </div>
    )
}

export default RoomGame