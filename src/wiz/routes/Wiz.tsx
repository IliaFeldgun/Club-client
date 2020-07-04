import React from "react";
import './Wiz.css';
import WizGame from "../components/WizGame";
import { match, RouteComponentProps } from "react-router";
import { WizApi } from "../api/WizApi";
import ICard, { Suit, Rank } from "../../interfaces/Card";
import { PossibleMoves } from "../interfaces/PossibleMoves";
import IWizPlayer from "../interfaces/WizPlayer";
import IWizAnnouncement from "../interfaces/WizAnnouncement";

interface IRouteParams {
    id: string
}
interface IWizProps extends RouteComponentProps<IRouteParams>{
    match: match<IRouteParams>
}
interface IWizState {
    gameId: string
    instructions: PossibleMoves
    players: IWizPlayer[]
    nextPlayer: string
    playerHand: ICard[]
    tableStack: ICard[]
    strongSuit?: Suit
    announcement?: IWizAnnouncement
}
export default class Wiz extends React.PureComponent<IWizProps,IWizState> {
    constructor(props: IWizProps) {
        super(props)

        this.state = {
            gameId: props.match.params.id,
            instructions: PossibleMoves.NONE,
            players: [], 
            nextPlayer: "",
            playerHand: [], 
            tableStack: [],
            announcement: undefined
        }
    }
    componentDidMount() {
        const eventSource = WizApi.listenToUpdateEvent(this.state.gameId)
        eventSource.onmessage = (event) => {
            this.setState(() => ({
                announcement: JSON.parse(event.data)
            }))
            this.fetchDataToState()
        }
        this.fetchDataToState()
    }
    handleCardSend = (card: ICard) => {
        // if (this.canPlayCard(card)) {
            WizApi.sendCard(this.state.gameId, card).then((isCardSent) => {
                if (!isCardSent) {
                    alert("NOPE")
                    window.location.reload()
                }
                // this.fetchDataToState()
            })
        // }
    }
    handleBet = (bet: number) => {
        WizApi.sendBet(this.state.gameId, bet).then((isBetSent) => {
            if (isBetSent) {
                // this.fetchDataToState()
            }
        })
    }
    render() {
        let toRender = <WizGame players={this.state.players} 
                                nextPlayer={this.state.nextPlayer}
                                playerHand={this.state.playerHand}
                                tableStack={this.state.tableStack}
                                handleFanCardClick={this.handleCardSend}
                                handleBet={this.handleBet}
                                strongSuit={this.state.strongSuit}
                                instructions={this.state.instructions}
                                announcement={this.state.announcement}/>
        // TODO: Render error element
        // if (!this.state.game || !this.state.players)
            // toRender = <React.Fragment/>
        return (
            <React.Fragment>
                {toRender}
            </React.Fragment>
        )
    }
    fetchDataToState() {
        const gameId = this.state.gameId

        WizApi.getGameInstructions(gameId).then((instructions) => {
            this.setState(() => ({instructions}))
        })
        WizApi.getGamePlayers(gameId).then((players) => {
            this.setState(() => ({players}))
        })
        WizApi.getNextPlayer(gameId).then((nextPlayer) => {
            this.setState(() => ({nextPlayer}))
        })
        WizApi.getPlayerHand(gameId).then((playerHand) => {
            this.setState(() => ({playerHand}))
        })
        WizApi.getTableStack(gameId).then((tableStack) => {
            this.setState(() => ({tableStack}))
        })
        WizApi.getStrongSuit(gameId).then((strongSuit) => {
            this.setState(() => ({strongSuit}))
        })
    }
    canPlayCard(card: ICard) {
        const requiredSuit = this.state.tableStack[0].suit
        const isCorrectSuit = requiredSuit === card.suit
        const hasCorrectSuit = this.state.playerHand.some(card => card.suit === requiredSuit)
        const isJoker = card.rank === Rank.JOKER

        return isJoker || isCorrectSuit || !hasCorrectSuit
    }
}