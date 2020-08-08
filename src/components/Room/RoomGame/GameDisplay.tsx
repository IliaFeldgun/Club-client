import React from 'react'

import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    gameName: {

    }
})
interface IGameDisplayProps {
    gameName: string
}
const GameDisplay: React.FC<IGameDisplayProps> = (props) => {
    const classes = useStyles()
    return (
        <React.Fragment>
            {props.gameName && 
                <div className={classes.gameName}>
                    {"Game in progress: "}
                    {props.gameName}
                </div>
            }
        </React.Fragment>
    )
}

export default GameDisplay