import React from "react"
import { Redirect } from "react-router-dom"
import ClubSession from "../utils/ClubSession"
import LoginForm from "../components/Login/LoginForm"
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    centeredTop: {
        position: 'absolute',
        top: '30%',
        left: '50%',
        textAlign: 'center',
        transform: 'translate(-50%, -50%)',
        width: 'fit-content'
    }
})
const Login: React.FC = () => {
    const classes = useStyles()
    let pageContents = ClubSession.getPlayerName() ? <Redirect to="/" /> : <LoginForm />

    return (
        <div className={classes.centeredTop}>
            {pageContents}
        </div>
    )
}

export default Login