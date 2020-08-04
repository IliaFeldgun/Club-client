import React from 'react'

interface IGameDisplayProps {
    gameName: string
}
const GameDisplay: React.FC<IGameDisplayProps> = (props) => {
    return (
        <React.Fragment>
            {props.gameName && 
                <div className="room-game-name">
                    {"Game in progress: "}
                    {props.gameName}
                </div>
            }
        </React.Fragment>
    )
}

export default GameDisplay