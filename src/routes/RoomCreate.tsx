import React from 'react'
import LobbyApi from '../engine/api/LobbyApi'
import LoginModal from '../components/Login/LoginModal'
import ClubSession from '../utils/ClubSession'
interface IRoomCreateProps {

}
interface IRoomCreateState {
    roomId: string
    isLoggedIn: boolean
}
export default class Rooms extends React.PureComponent<IRoomCreateProps,IRoomCreateState> {
    constructor(props: IRoomCreateProps) {
        super(props)

        this.state = {
            roomId: "",
            isLoggedIn: ClubSession.getPlayerId() !== null
        }
    }
    handleRoomCreation = (event: React.MouseEvent<HTMLButtonElement>) => {
        LobbyApi.newRoom().then((roomId) => {
            window.location.assign("/room/" + roomId) 
        })
    }
    render() {
        const buttonClass = "form-button"
        return (
            <React.Fragment>
                <div className="centered-top">
                    <h3>Create a room</h3>
                    <button className={buttonClass} type="button" onClick={this.handleRoomCreation}>
                        <span>New Room</span>
                    </button>
                </div>
                <LoginModal show={!this.state.isLoggedIn} />
            </React.Fragment>
        )
    }
}