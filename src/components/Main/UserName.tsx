import React from "react"
import ClubSession from "../../utils/ClubSession"

export default class UserName extends React.PureComponent {
    componentDidMount() {
            ClubSession.assertSession()
    }
    render() {
        let playerName = ClubSession.getPlayerName()
        let nameToRender = playerName ? 
            <a href="/profile">{playerName}</a> : 
            <a href="/login">Login</a>

        return (
            <span className="main-user">
                {nameToRender}
            </span>
        )
    }
}