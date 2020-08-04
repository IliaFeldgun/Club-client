import React from "react"
import Card, { ICardProps } from "./Card"
import ICard from "../../interfaces/Card"

interface ICardFanProps {
    yourTurn: boolean
    cards: Array<{suit: ICardProps["suit"], rank: ICardProps["rank"]}>
    handleCardClick?: (event: React.MouseEvent, 
                       suit: ICardProps["suit"], 
                       rank: ICardProps["rank"]) => void
}
const CardFan: React.FC<ICardFanProps> = (props) => {
    const [cards, setCards] = React.useState<JSX.Element[]>([])
    
    const handleCardClick = (event: React.MouseEvent, suit: ICardProps["suit"], rank: ICardProps["rank"]) => {
        if (props.yourTurn) {
            let cssClasses = ["play-card"]
            Math.round(Math.random()) ? cssClasses.push("right") : cssClasses.push("left")
            event.currentTarget.classList.add(cssClasses[0], cssClasses[1])
            if (props.handleCardClick)
                props.handleCardClick(event, suit, rank)
        }
    }

    React.useEffect(() => {
        if (props.cards.length && props.cards && props.cards[0]) {
            const totalCards = props.cards.length
            const increment = 10
            const firstDegree = (-1) * increment * ((totalCards % 2) ? (totalCards-1)/2 : totalCards/2)
            let currentDegree = firstDegree

            setCards(props.cards.map((card: ICard) => {
                const currentRotate = currentDegree
                currentDegree+= increment
                return <Card key={`${card.suit},${card.rank}`} 
                            suit={card.suit} rank={card.rank} 
                            rotateDegree={currentRotate} 
                            handleClick={handleCardClick}/>
            }))
        }
        else {
            setCards([<React.Fragment />])
        }

    }, [props.cards])

    
    
    let wrongTurnTooltip = <React.Fragment />
    if (!props.yourTurn) {
        wrongTurnTooltip =  
            <span className="tooltip-text">
                Wait for your turn
            </span>
    }
    return (
        <div className="player-fan">
            {wrongTurnTooltip}
            {cards}
        </div>
    )
}

export default CardFan