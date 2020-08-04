import React from "react"
import ClubSession from "../../utils/ClubSession"

const UserName: React.FunctionComponent = () => {
    const [playerName, setPlayerName] = React.useState("")
    React.useEffect(() => {
        ClubSession.assertSession()
    }, [])

    React.useEffect(() => {
        const newPlayerName = ClubSession.getPlayerName()

        if (newPlayerName && newPlayerName !== "")
            setPlayerName(newPlayerName)
    })

    const toRender = playerName !== "" ? 
        <a href="/profile">{playerName}</a> : 
        <a href="/login">Login</a>

    return (
        <span className="main-user">
            {toRender}
        </span>
    )
}

export default UserName