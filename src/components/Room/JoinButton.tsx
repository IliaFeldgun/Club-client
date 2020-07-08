import React from 'react'
import LobbyApi from '../../engine/api/LobbyApi'
import ClientError from '../../engine/api/ClientError'

interface IJoinButtonProps{
    roomId: string
}
export default class JoinButton extends React.PureComponent<IJoinButtonProps,{}>{
    handleRoomJoin = (event: React.MouseEvent<HTMLButtonElement>) => {
        LobbyApi.joinRoom(this.props.roomId).then((roomId) => 
        {
            window.location.assign("/room/" + roomId)
        }).catch((error: ClientError) => {
            // TODO: Handle better
            console.error(`${error.httpStatusCode}: ${error.message}`)
        })
    }
    render() {
        const buttonClass = "form-button"
        return (
            <button className={buttonClass} type="button" onClick={this.handleRoomJoin}>
                <span>Join this room</span>
            </button>
        )
    }
}