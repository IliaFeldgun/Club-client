import React from "react"
import LobbyApi from "../../engine/api/LobbyApi"
import ClubSession from "../../utils/ClubSession"
import ClientError from "../../engine/api/ClientError"
import ClientErrorBox from "../ClientErrorBox"

interface ILoginFormProps {
    className: string
}
interface ILoginFormState {
    playerName: string,
    error?: ClientError
}
export default class LoginForm extends React.PureComponent<ILoginFormProps,ILoginFormState> {
    constructor(props: ILoginFormProps) {
        super(props)
        this.state = { playerName: "", error: undefined }
    }
    static defaultProps = {
        className: ""
    }
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            playerName: event.target.value
        })
    }
    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.sendLogin()
    }
    handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) { // "RETURN" key
            this.sendLogin()
        }
    }
    sendLogin = () => {
        if(this.state.playerName) {
            LobbyApi.newPlayer(this.state.playerName).then((isCreated) => {
                ClubSession.assertSession()
            }).catch((error: ClientError) => {
                this.setState({
                    error
                })
            })
        }
    }
    handleErrorClose = () => {
        this.setState({
            error: undefined
        })
    }
    render() {
        const fieldClass = "form-field"
        const allClass = this.props.className + " login-form"
        const buttonClass = "form-button"
        const errorDisplay = !this.state.error ? <React.Fragment /> : 
            <ClientErrorBox error={this.state.error} onModalClose={this.handleErrorClose} />
        return (
            <React.Fragment>
                <div className={allClass}>
                    <h3>Login with a name of your choice</h3>
                    <input 
                        className={fieldClass} 
                        id="playerName" 
                        type="text" 
                        name="playerName" 
                        onChange={this.handleChange} 
                        onKeyUp={this.handleKeyUp} 
                    />
                    <button className={buttonClass} id="loginsend" onClick={this.handleClick}>
                        <span>
                            Login
                        </span>
                    </button>
                </div>
                {errorDisplay}
            </React.Fragment>
        )
    }
}