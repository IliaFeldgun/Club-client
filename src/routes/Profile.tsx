import React from 'react'
import RoomList from '../components/RoomList'
import LobbyApi from '../api/LobbyApi'
import LogoutForm from '../components/Login/LogoutForm'
import ClubSession from '../utils/ClubSession'
import { Redirect } from "react-router-dom"

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
        LobbyApi.getPlayerRooms().then((rooms) => this.setState(() => ({rooms})))
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
            {toRender}
        )
    }

}