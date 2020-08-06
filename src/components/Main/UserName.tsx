import React from "react"
import ClubSession from "../../utils/ClubSession"

import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    user: {
        fontSize: '3vh',
        float: 'right',
        lineHeight: '6vh',
        marginRight: '2vmax',
    }
})
const UserName: React.FunctionComponent = () => {
    const classes = useStyles()
    const [playerName, setPlayerName] = React.useState("")
    React.useEffect(() => {
        ClubSession.assertSession()
    }, [])

    React.useEffect(() => {
        const newPlayerName = ClubSession.getPlayerName()

        if (newPlayerName && newPlayerName !== "")
            setPlayerName(newPlayerName)
    }, [])

    const toRender = playerName !== "" ? 
        <a href="/profile">{playerName}</a> : 
        <a href="/login">Login</a>

    return (
        <span className={classes.user}>
            {toRender}
        </span>
    )
}

export default UserName