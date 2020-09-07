import React from 'react'
import PlayerListItem from './PlayerListItem'
import IWizPlayer from '../interfaces/WizPlayer'

import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles({
    list: {
        padding: '0.5vh'
    }
})

interface IWizPlayerListProps {
    players: IWizPlayer[]
    nextPlayer: string
}
const WizPlayerList: React.FC<IWizPlayerListProps> = (props) => {
    const classes = useStyles()
    const [players, setPlayers] = React.useState<JSX.Element[]>([])

    React.useEffect(() => {
        if (props.players) {
            setPlayers(props.players.map((player) => {
                return <PlayerListItem
                    highlight={player.id === props.nextPlayer}
                    key={player.id}
                    name={player.name}
                    score={player.score}
                    bet={player.bet}
                    takes={player.takes} />
            }))
        }
    }, [props.players, props.nextPlayer])

    return (
        <div className={classes.list}>
            Players:
            {players}
        </div>
    )
}

export default WizPlayerList