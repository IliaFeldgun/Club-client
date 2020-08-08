import React from 'react'
import createGame from '../../../engine/GameSelector'
import {createUseStyles} from 'react-jss'
import formClasses from '../../../style/formClasses'
const useStyles = createUseStyles({
    button: formClasses.formButton
})

interface ICreateGameProps {
    roomId: string
    gameName: string
}
const CreateGame: React.FC<ICreateGameProps> = (props) => {
    const classes = useStyles()
    const handleGameCreation = (event: React.MouseEvent<HTMLButtonElement>) => {
        const gameName = props.gameName
        const gameCreator = createGame(gameName)
        if (gameCreator) {
            gameCreator(props.roomId).then((gameId: string) => {
                window.location.assign(`/${gameName}/` + gameId) 
            })
        }
    }

    return (
        <React.Fragment>
            <button
                className={classes.button}
                type="button"
                onClick={handleGameCreation}
            >
                <span>Create Game</span>
            </button>
        </React.Fragment>
    )
}

export default CreateGame