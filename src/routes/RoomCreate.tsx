import React from 'react'
import LobbyApi from '../engine/api/LobbyApi'
import LoginModal from '../components/Login/LoginModal'
import ClubSession from '../utils/ClubSession'
import ClientError from '../engine/api/ClientError'

const Rooms: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(true)
    React.useEffect(() => {
        setIsLoggedIn(ClubSession.getPlayerId() !== null)
    }, [isLoggedIn])

    const handleRoomCreation = (event: React.MouseEvent<HTMLButtonElement>) => {
        LobbyApi.newRoom().then((roomId) => {
            // TODO: Make sure there is no better way
            window.location.assign("/room/" + roomId) 
        }).catch((error: ClientError) => {
            // TODO: Handle better, 401
            console.error(`${error.httpStatusCode}: ${error.message}`)
        })
    }
    
    const buttonClass = "form-button"
    return (
        <React.Fragment>
            <div className="centered-top">
                <h3>Create a room</h3>
                <button 
                    className={buttonClass} 
                    type="button" 
                    onClick={handleRoomCreation}
                >
                    <span>New Room</span>
                </button>
            </div>
            <LoginModal show={!isLoggedIn} />
        </React.Fragment>
    )
}

export default Rooms