import React from 'react'
import { createUseStyles } from 'react-jss'
import formClasses from '../../../style/formClasses'
import LobbyApi from '../../../engine/api/LobbyApi'
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
        LobbyApi.createGame(props.roomId, gameName).then((gameId: string) => {
            window.location.assign(`/${gameName}/` + gameId)
        }).catch((error) => {
            console.log(error)
            // TODO: Handle
        })
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