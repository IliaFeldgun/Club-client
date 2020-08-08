import React from "react"
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    description: {
        padding: '1vmax',
        marginTop: '2vh',
        marginBottom: '2vh',
        marginRight: '2vw',
        marginLeft: '2vw',
        borderRadius: '6px',
        backgroundColor: 'whitesmoke',
        width: '50%'
    }
})

const Description: React.FunctionComponent = () => {
    const classes = useStyles()

    return (
        <div className={classes.description}>
            This is a platform for turn-based games.
        </div>
    )
}
export default Description