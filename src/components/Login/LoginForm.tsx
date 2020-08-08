import React from "react"
import LobbyApi from "../../engine/api/LobbyApi"
import ClubSession from "../../utils/ClubSession"
import ClientError from "../../engine/api/ClientError"
import ClientErrorBox from "../ClientErrorBox"

import {createUseStyles} from 'react-jss'
import formClasses from '../../style/formClasses'

const useStyles = createUseStyles({
    loginForm: {

    },
    formField: {
        border: 0,
        borderBottom: '1px solid grey',
        marginRight: '4px',
        '&:focus': {
            outline: 0
        }
    },
    formButton: formClasses.formButton
})

const LoginForm: React.FC = () => {
    const classes = useStyles()
    const [playerName, setPlayerName] = React.useState("")
    const [error, setError] = React.useState<ClientError>()
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(event.target.value)
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        sendLogin()
    }
    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) { // "RETURN" key
            sendLogin()
        }
    }
    const sendLogin = () => {
        if(playerName) {
            LobbyApi.newPlayer(playerName).then((isCreated) => {
                ClubSession.assertSession()
            }).catch((error: ClientError) => {
                setError(error)
            })
        }
    }
    const handleErrorClose = () => {
        setError(undefined)
    }
    const errorDisplay = !error ? <React.Fragment /> : 
        <ClientErrorBox error={error} onModalClose={handleErrorClose} />
    
    return (
        <React.Fragment>
            <div>
                <h3>Login with a name of your choice</h3>
                <input 
                    className={classes.formField}
                    id="playerName"
                    type="text"
                    name="playerName"
                    autoFocus={true}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
                <button className={classes.formButton} id="loginsend" onClick={handleClick}>
                    <span>
                        Login
                    </span>
                </button>
            </div>
            {errorDisplay}
        </React.Fragment>
    )
}

export default LoginForm