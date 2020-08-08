import React from "react"
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    scoreBoard: {
        flexBasis: '25%'
    }
})
const ScoreBoard: React.FC = (props) => {
    const classes = useStyles()
    return (
        <span className={classes.scoreBoard}>
            {props.children}
        </span>
    )
}

export default ScoreBoard