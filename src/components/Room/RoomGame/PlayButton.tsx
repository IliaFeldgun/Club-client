import React from 'react'

interface IPlayButtonProps{
    handlePlay: () => void
}
const PlayButton: React.FC<IPlayButtonProps> = (props) => {
    const handlePlay = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.handlePlay()
    }
    
    const buttonClass = "form-button"
    return (
        <button className={buttonClass} type="button" onClick={handlePlay}>
            <span>Play the game</span>
        </button>
    )
}

export default PlayButton