import React from 'react'
import ClubSession from '../../utils/ClubSession'

import {createUseStyles} from 'react-jss'
import formClasses from '../../style/formClasses'

const useStyles = createUseStyles({
    formButton: formClasses.formButton
})
const LogoutForm: React.FunctionComponent = () => {
    const classes = useStyles()
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        ClubSession.killSession()
    }

    return (
        <button className={classes.formButton} onClick={handleClick}>
            <span>
                Logout
            </span>
        </button>
    )
}

export default LogoutForm