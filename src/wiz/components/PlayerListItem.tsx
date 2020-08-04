import React from 'react'

interface IPlayerListItemProps {
    name: string,
    score: number,
    bet: number,
    takes: number,
    className: string
}
const PlayerListItem: React.FC<IPlayerListItemProps> = (props) => {
    return (
        <span className={`${props.className} player-list-item`}>
            <span className="pli-name">{props.name}</span>
            <span className="pli-score">
                {props.score}
                <span className="tooltip-text">Score</span>
            </span>
            <span className="pli-bet-takes">
                <span className="pli-bet">
                    {props.bet}
                    <span className="tooltip-text">Bet</span>
                </span>
                
                <span className="pli-takes">
                    {props.takes}
                    <span className="tooltip-text">Takes</span>
                </span>
            </span>
        </span>
    )
}

export default PlayerListItem