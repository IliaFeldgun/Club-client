import React from "react"
import LobbyApi from "../../engine/api/LobbyApi"
import ClubSession from "../../utils/ClubSession"
import ClientError from "../../engine/api/ClientError"
import ClientErrorBox from "../ClientErrorBox"
// TODO: make className optional
interface ILoginFormProps {
    className: string
}
const LoginForm: React.FC<ILoginFormProps> = (props) => {
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
    const fieldClass = "form-field"
    const allClass = props.className + " login-form"
    const buttonClass = "form-button"
    const errorDisplay = !error ? <React.Fragment /> : 
        <ClientErrorBox error={error} onModalClose={handleErrorClose} />
    
    return (
        <React.Fragment>
            <div className={allClass}>
                <h3>Login with a name of your choice</h3>
                <input 
                    className={fieldClass} 
                    id="playerName" 
                    type="text" 
                    name="playerName" 
                    onChange={handleChange} 
                    onKeyUp={handleKeyUp} 
                />
                <button className={buttonClass} id="loginsend" onClick={handleClick}>
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