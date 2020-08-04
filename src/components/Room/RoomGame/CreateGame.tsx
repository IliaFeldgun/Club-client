import React from 'react'
import createGame from '../../../engine/GameSelector'

interface ICreateGameProps {
    roomId: string
    gameName: string
}
const CreateGame: React.FC<ICreateGameProps> = (props) => {
    const handleGameCreation = (event: React.MouseEvent<HTMLButtonElement>) => {
        const gameName = props.gameName
        const gameCreator = createGame(gameName)
        if (gameCreator) {
            gameCreator(props.roomId).then((gameId: string) => {
                window.location.assign(`/${gameName}/` + gameId) 
            })
        }
    }

    const buttonClass = "form-button"
    return (
        <React.Fragment>
            <button
                className={buttonClass}
                type="button"
                onClick={handleGameCreation}
            >
                <span>Create Game</span>
            </button>
        </React.Fragment>
    )
}


export default CreateGame