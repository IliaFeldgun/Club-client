import React from 'react'
import RoomList from '../components/RoomList'
import LobbyApi from '../engine/api/LobbyApi'
import LogoutForm from '../components/Login/LogoutForm'
import ClubSession from '../utils/ClubSession'
import { Redirect } from "react-router-dom"
import ClientError from '../engine/api/ClientError'

const Profile: React.FC = () => {
    const [rooms, setRooms] = React.useState<string[]>([])
    React.useEffect(() => {
        LobbyApi.getPlayerRooms().then(
            (playerRooms) => setRooms(() => (playerRooms))
        ).catch((error: ClientError) => {
            // TODO: Handle better
            console.error(`${error.httpStatusCode}: ${error.message}`)
        })
    }, [])
    
    let toRender = 
        <div className="centered-top">
            <LogoutForm />
            <br />
            Your rooms:
            <RoomList rooms={rooms}/>
        </div>
    if (!ClubSession.getPlayerId())
        toRender = <Redirect to="/"/>
    return (
        <React.Fragment>
            {toRender}
        </React.Fragment>
    )
}

export default Profile