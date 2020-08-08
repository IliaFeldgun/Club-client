import React from 'react'
import LobbyApi from '../../engine/api/LobbyApi'
import ClientError from '../../engine/api/ClientError'
import {createUseStyles} from 'react-jss'
import formClasses from '../../style/formClasses'
const useStyles = createUseStyles({
    button: formClasses.formButton
})

interface IJoinButtonProps{
    roomId: string
}
const JoinButton: React.FC<IJoinButtonProps> = (props) => {
    const classes = useStyles()
    const handleRoomJoin = (event: React.MouseEvent<HTMLButtonElement>) => {
        LobbyApi.joinRoom(props.roomId).then((roomId) => 
        {
            window.location.assign("/room/" + roomId)
        }).catch((error: ClientError) => {
            // TODO: Handle better
            console.error(`${error.httpStatusCode}: ${error.message}`)
        })
    }
    
    return (
        <button className={classes.button} type="button" onClick={handleRoomJoin}>
            <span>Join this room</span>
        </button>
    )
}

export default JoinButton