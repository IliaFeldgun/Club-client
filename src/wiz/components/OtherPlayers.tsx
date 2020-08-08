import React from 'react'
import WizOtherPlayer from './OtherPlayer'
import ClubSession from '../../utils/ClubSession'
import IWizPlayer from '../interfaces/WizPlayer'

interface IWizOtherPlayersProps {
    players: IWizPlayer[]
}
const WizOtherPlayers: React.FC<IWizOtherPlayersProps> = (props) => {
    const [players, setPlayers] = React.useState<JSX.Element[]>([])
    
    React.useEffect(() => {
        const otherPlayers = props.players.filter((player) => {
            return player.id !== ClubSession.getPlayerId()
        })
        
        const otherPlayerHands = otherPlayers.map((player) => 
        {
            return {
                name: player.name, 
                cards: player.handSize
            }
        })

        setPlayers(otherPlayerHands.map((player, index) => {
            return (
                    <WizOtherPlayer key={player.name} 
                                    name={player.name} 
                                    cards={player.cards} 
                                    className={`other-fan-${index + 1}`}/>
            )
        }))
    }, [props.players])
    
    return (
        <div>
            {players}
        </div>
    )
}

export default WizOtherPlayers