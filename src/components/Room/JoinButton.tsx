import React from 'react'
import LobbyApi from '../../engine/api/LobbyApi'
import ClientError from '../../engine/api/ClientError'

interface IJoinButtonProps{
    roomId: string
}
const JoinButton: React.FC<IJoinButtonProps> = (props) => {
    const handleRoomJoin = (event: React.MouseEvent<HTMLButtonElement>) => {
        LobbyApi.joinRoom(props.roomId).then((roomId) => 
        {
            window.location.assign("/room/" + roomId)
        }).catch((error: ClientError) => {
            // TODO: Handle better
            console.error(`${error.httpStatusCode}: ${error.message}`)
        })
    }
    
    const buttonClass = "form-button"
    return (
        <button className={buttonClass} type="button" onClick={handleRoomJoin}>
            <span>Join this room</span>
        </button>
    )
}

export default JoinButton