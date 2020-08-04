import React from "react"

interface IPlayerListProps {
    players: string[]
}
const PlayerList: React.FunctionComponent<IPlayerListProps> = (props) => {
    const [players, setPlayers] = React.useState<JSX.Element[]>([])
    
    React.useEffect(() => {
        setPlayers(props.players.map((player) => 
            <li key={player}>{player}</li>    
        ))

    }, [props.players])
    
    return (
        <ol>
            {players}
        </ol>
    )
}
export default PlayerList