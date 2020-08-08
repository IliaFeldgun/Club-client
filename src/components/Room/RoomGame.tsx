import React from 'react'
import GameDisplay from './RoomGame/GameDisplay'
import PlayButton from './RoomGame/PlayButton'
import GameDropDown from './RoomGame/GameDropDown'
import CreateGame from './RoomGame/CreateGame'
import ClubSession from '../../utils/ClubSession'

import {createUseStyles} from 'react-jss'

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
    gameNames: string[]
}
const RoomGame: React.FC<IRoomGameProps> = (props) => {
    const classes = useStyles()
    const [selectedGame, setSelectedGame] = React.useState("")

    React.useEffect(() => {
        setSelectedGame(props.gameNames[0])
    }, [ props.gameNames ])

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
    else if (props.gameNames && 
        props.gameNames.length &&
        props.roomLeaderId === ClubSession.getPlayerId()
    ) {
        toRender = 
            <React.Fragment>
                <GameDropDown 
                    handleSelection={handleGameSelect} 
                    gameNames={props.gameNames} 
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