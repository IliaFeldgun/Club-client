import React from "react"
import {createUseStyles} from 'react-jss'
const useStyles = createUseStyles({
    title: {
        marginLeft: '0.5vmax',
        lineHeight: '6vh',
        fontSize: '4vh',
        fontWeight: 'bold'
    }
})
const Header: React.FunctionComponent = (props) =>{
    const classes = useStyles()
    return (
        <React.Fragment>
            <header>
                <a href="/">
                    <span className={classes.title}>♣ Club</span>
                </a>
                {props.children}
            </header>
        </React.Fragment>
    )
}

export default Header