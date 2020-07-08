import React from 'react'
import RoomList from '../components/RoomList'
import LobbyApi from '../engine/api/LobbyApi'
import LogoutForm from '../components/Login/LogoutForm'
import ClubSession from '../utils/ClubSession'
import { Redirect } from "react-router-dom"
import ClientError from '../engine/api/ClientError'

interface IProfileProps {

}
interface IProfileState {
    rooms: string[]
}
export default class Profile extends React.PureComponent<IProfileProps,IProfileState> {
    constructor(props: IProfileProps) {
        super(props)

        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        LobbyApi.getPlayerRooms().then(
            (rooms) => this.setState(() => ({rooms}))
        ).catch((error: ClientError) => {
            // TODO: Handle better
            console.error(`${error.httpStatusCode}: ${error.message}`)
        })
    }
    render() {
        let toRender = 
            <div className="centered-top">
                <LogoutForm />
                <br />
                Your rooms:
                <RoomList rooms={this.state.rooms}/>
            </div>
        if (!ClubSession.getPlayerId())
            toRender = <Redirect to="/"/>
        return (
            <React.Fragment>
                {toRender}
            </React.Fragment>
        )
    }

}