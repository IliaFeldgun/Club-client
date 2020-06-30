import React from "react";
import './Login.css';
import { Redirect } from "react-router-dom"
import ClubSession from "../utils/ClubSession"
import LoginForm from "../components/Login/LoginForm";

export default class Login extends React.PureComponent {
    render() {
        let pageContents = ClubSession.getPlayerName() ? <Redirect to="/"/> : <LoginForm className="centered-top"/>

        return (
            <React.Fragment>
                {pageContents}
            </React.Fragment>
        )
    }
}