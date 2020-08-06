import React from "react"
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    cardBoard: {
        flexGrow: 1,
        position: 'relative',
        background: 'rgba(7,150,34)'
    }
})

const CardBoard: React.FC = (props) => {
    const classes = useStyles()
    
    return (
        <span className={classes.cardBoard}>
            {props.children}
        </span>
    )
}

export default CardBoard