import React from "react"
import './Wiz.css'
import WizGame from "../components/WizGame"
import { match, RouteComponentProps } from "react-router"
import { WizApi } from "../api/WizApi"
import ICard, { Suit } from "../../interfaces/Card"
import { PossibleMoves } from "../interfaces/PossibleMoves"
import IWizPlayer from "../interfaces/WizPlayer"
import IWizAnnouncement from "../interfaces/WizAnnouncement"

interface IRouteParams {
    id: string
}
interface IWizProps extends RouteComponentProps<IRouteParams>{
    match: match<IRouteParams>
}
const Wiz: React.FC<IWizProps> = (props) => {
    const gameId = props.match.params.id
    const [announcement, setAnnouncement] = React.useState<IWizAnnouncement>()
    const [instructions, setInstructions] = React.useState<PossibleMoves>(PossibleMoves.NONE)
    const [players, setPlayers] = React.useState<IWizPlayer[]>([])
    const [nextPlayer, setNextPlayer] = React.useState("")
    const [playerHand, setPlayerHand] = React.useState<ICard[]>([])
    const [tableStack, setTableStack] = React.useState<ICard[]>([])
    const [strongSuit, setStrongSuit] = React.useState<Suit>()

    const fetchDataToState = React.useCallback(() => {
        WizApi.getGameInstructions(gameId).then((instructions) => {
            setInstructions(instructions)
        })
        WizApi.getGamePlayers(gameId).then((players) => {
            setPlayers(players)
        })
        WizApi.getNextPlayer(gameId).then((nextPlayer) => {
            setNextPlayer(nextPlayer)
        })
        WizApi.getPlayerHand(gameId).then((playerHand) => {
            setPlayerHand(playerHand)
        })
        WizApi.getTableStack(gameId).then((tableStack) => {
            setTableStack(tableStack)
        })
        WizApi.getStrongSuit(gameId).then((strongSuit) => {
            setStrongSuit(strongSuit)
        })
    }, [gameId])
    
    React.useEffect(() => {
        const eventSource = WizApi.listenToUpdateEvent(gameId)
        eventSource.onmessage = (event) => {
            setAnnouncement(JSON.parse(event.data))
            fetchDataToState()
        }
        fetchDataToState()
    }, [ fetchDataToState, gameId ])

    const handleCardSend = (card: ICard) => {
            WizApi.sendCard(gameId, card).then((isCardSent) => {
                if (!isCardSent) {
                    alert("NOPE")
                    window.location.reload()
                }
            })
    }
    const handleBet = (bet: number) => {
        WizApi.sendBet(gameId, bet).then((isBetSent) => {
        })
    }

    let toRender = <WizGame players={players} 
                            nextPlayer={nextPlayer}
                            playerHand={playerHand}
                            tableStack={tableStack}
                            handleFanCardClick={handleCardSend}
                            handleBet={handleBet}
                            strongSuit={strongSuit}
                            instructions={instructions}
                            announcement={announcement}/>
    // TODO: Render error element
    // if (!state.game || !state.players)
        // toRender = <React.Fragment/>
    return (
        <React.Fragment>
            {toRender}
        </React.Fragment>
    )
}
// canPlayCard(card: ICard) {
//     const requiredSuit = state.tableStack[0].suit
//     const isCorrectSuit = requiredSuit === card.suit
//     const hasCorrectSuit = state.playerHand.some(card => card.suit === requiredSuit)
//     const isJoker = card.rank === Rank.JOKER

//     return isJoker || isCorrectSuit || !hasCorrectSuit
// }

export default Wiz