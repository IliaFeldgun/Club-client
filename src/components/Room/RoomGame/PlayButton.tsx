import React from 'react'
import {createUseStyles} from 'react-jss'
import formClasses from '../../../style/formClasses'
const useStyles = createUseStyles({
    button: formClasses.formButton
})

interface IPlayButtonProps{
    handlePlay: () => void
}
const PlayButton: React.FC<IPlayButtonProps> = (props) => {
    const classes = useStyles()
    const handlePlay = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.handlePlay()
    }
    
    return (
        <button className={classes.button} type="button" onClick={handlePlay}>
            <span>Play the game</span>
        </button>
    )
}

export default PlayButton