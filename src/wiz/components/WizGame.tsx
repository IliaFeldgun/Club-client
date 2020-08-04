import React from "react"
import CardBoard from "./CardBoard"
import CardFan from "./CardFan"
import ScoreBoard from "./ScoreBoard"
import CardStack from "./CardStack"
import { ICardProps } from "./Card"
import ICard, { Suit } from "../../interfaces/Card"
import WizPlayerList from "./PlayerList"
import WizOtherPlayers from "./OtherPlayers"
import ClubSession from "../../utils/ClubSession"
import { PossibleMoves } from "../interfaces/PossibleMoves"
import SetBet from "./SetBet"
import StrongSuit from "./StrongSuit"
import IWizPlayer from "../interfaces/WizPlayer"
import IWizAnnouncement from "../interfaces/WizAnnouncement"
import Announcement from "./Announcement"

interface IWizGameProps {
    instructions: PossibleMoves
    players: IWizPlayer[]
    nextPlayer: string
    strongSuit?: Suit
    playerHand: ICard[]
    tableStack: ICard[]
    announcement?: IWizAnnouncement
    handleFanCardClick?: (card: ICard) => void
    handleBet?: (bet: number) => void
}
const WizGame: React.FC<IWizGameProps> = (props) => {
    const [shouldBet, setShouldBet] = React.useState(false)
    
    React.useEffect(() => {
        const isYourTurn = isCurrentPlayersTurn(props.nextPlayer) 
        const playerHasHand = props.playerHand !== undefined
        const isInstructionBet = props.instructions === PossibleMoves.PLACE_BET
        const player = getCurrentPlayer(props.players)
        const didPlayerNotBet = player !== undefined && player.bet === undefined
        setShouldBet(isYourTurn && playerHasHand && isInstructionBet && didPlayerNotBet)
    }, [props.nextPlayer, props.playerHand, props.instructions, props.players])
    
    const handleFanCardClick = (
        event: React.MouseEvent, 
        suit: ICardProps["suit"], 
        rank: ICardProps["rank"]
    ) => {
        if(props.handleFanCardClick)
            props.handleFanCardClick({suit,rank})
    }
    const handleBet = (event: React.MouseEvent, bet: number) => {
        if (props.handleBet) {
            props.handleBet(bet)
        }
    }
    
    let setBet = <React.Fragment />
    if (shouldBet) {
        setBet = <SetBet maxBet={props.playerHand.length} handleBet={handleBet}/>
    }
    let strongSuit = <React.Fragment />
    if (props.strongSuit) {
        strongSuit = <StrongSuit strongSuit={props.strongSuit} />
    }
    let announcement = <React.Fragment />
    if (props.announcement) {
        announcement = 
        <Announcement 
            announcement={props.announcement} 
            players={props.players}
        />
    }

    return (
        <React.Fragment>
            {setBet}
            {announcement}
            <CardBoard>
                {strongSuit}
                <CardStack cards={props.tableStack} />
                <CardFan yourTurn={shouldPlayCard(props.nextPlayer, props.instructions)} 
                    cards={props.playerHand} 
                    handleCardClick={handleFanCardClick}
                />
                <WizOtherPlayers players={props.players} />
            </CardBoard>
            <ScoreBoard>
                <WizPlayerList 
                    players={props.players} 
                    nextPlayer={props.nextPlayer} 
                />
            </ScoreBoard>
        </React.Fragment>
    )

}

const getCurrentPlayer = (players: IWizPlayer[]) => {
    return players.find((player) => {
        return player.id === ClubSession.getPlayerId()
    })
}

const isCurrentPlayersTurn = (nextPlayer: string): boolean => {
    return ClubSession.getPlayerId() === nextPlayer
}

const shouldPlayCard = (nextPlayer: string, instructions: PossibleMoves) => {
    return (
        instructions === PossibleMoves.PLAY_CARD && 
        isCurrentPlayersTurn(nextPlayer)
    )
}

export default WizGame