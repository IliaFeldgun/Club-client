import React from "react"
import LobbyApi from "../../engine/api/LobbyApi"
import ClubSession from "../../utils/ClubSession"
import ClientError from "../../engine/api/ClientError"
import ClientErrorBox from "../ClientErrorBox"
import {createUseStyles} from 'react-jss'

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
    formButton: {
        backgroundColor: 'rgb(0, 102, 153)',
        border: 0,
        color: 'white',
        borderRadius: '3px',
        paddingTop: '3px',
        paddingBottom: '3px',
        paddingLeft: '6px',
        paddingRight: '6px',
        marginTop: '5px',
        marginBottom: '5px',
        '&hover': {
            backgroundColor: 'cornflowerblue'
        }
    }
})


// TODO: make className optional
interface ILoginFormProps {
    className: string
}
const LoginForm: React.FC<ILoginFormProps> = (props) => {
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
    const allClass = props.className + " login-form"
    const errorDisplay = !error ? <React.Fragment /> : 
        <ClientErrorBox error={error} onModalClose={handleErrorClose} />
    
    return (
        <React.Fragment>
            <div className={allClass}>
                <h3>Login with a name of your choice</h3>
                <input 
                    className={classes.formField} 
                    id="playerName" 
                    type="text" 
                    name="playerName" 
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