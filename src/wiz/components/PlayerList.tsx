import React from 'react'
import PlayerListItem from './PlayerListItem'
import IWizPlayer from '../interfaces/WizPlayer'
interface IWizPlayerListProps {
    players: IWizPlayer[]
    nextPlayer: string
}
const WizPlayerList: React.FC<IWizPlayerListProps> = (props) => {
    const [players, setPlayers] = React.useState<JSX.Element[]>([])

    React.useEffect(() => {
        if (props.players) {
            setPlayers(props.players.map((player) => {
                let classes = ""
                if (player.id === props.nextPlayer) {
                    classes = "highlight"
                }
                return <PlayerListItem 
                    className={classes}
                    key={player.id} 
                    name={player.name} 
                    score={player.score}
                    bet={player.bet}
                    takes={player.takes} />
            }))
        }
    }, [props.players, props.nextPlayer])

    return (
        <div className="player-list">
            Players:
            {players}
        </div>
    )
}

export default WizPlayerList