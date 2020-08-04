import React from 'react'
import ClubSession from '../../utils/ClubSession'

const LogoutForm: React.FunctionComponent = () => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        ClubSession.killSession()
    }
    const buttonClass = "form-button"
    return (
        <button className={buttonClass} onClick={handleClick}>
            <span>
                Logout
            </span>
        </button>
    )
}

export default LogoutForm