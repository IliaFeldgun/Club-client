import React from 'react'
import WizOtherPlayer from './OtherPlayer'
import IWizPlayer from '../interfaces/WizPlayer'

import ClubSession from '../../utils/ClubSession'

interface IWizOtherPlayersProps {
    players: IWizPlayer[]
}
const WizOtherPlayers: React.FC<IWizOtherPlayersProps> = (props) => {
    const [players, setPlayers] = React.useState<JSX.Element[]>([])

    React.useEffect(() => {
        const otherPlayers = props.players.filter((player) => {
            return player.id !== ClubSession.getPlayerId()
        })

        const otherPlayerHands = otherPlayers.map((player) => {
            return {
                name: player.name,
                cards: player.handSize
            }
        })

        setPlayers(otherPlayerHands.map((player, index) => {
            return (
                <WizOtherPlayer
                    key={player.name}
                    name={player.name}
                    cards={player.cards}
                />
            )
        }))
    }, [props.players])

    return (
        <React.Fragment>
            {players}
        </React.Fragment>
    )
}

export default WizOtherPlayers