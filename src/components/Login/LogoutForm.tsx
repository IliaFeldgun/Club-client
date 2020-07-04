import React from 'react'
import ClubSession from '../../utils/ClubSession'

export default class LogoutForm extends React.PureComponent {
    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        ClubSession.killSession()
    }
    render() {
        const buttonClass = "form-button"
        return (
            <button className={buttonClass} onClick={this.handleClick}>
            <span>
                Logout
            </span>
        </button>
        )
    }
}