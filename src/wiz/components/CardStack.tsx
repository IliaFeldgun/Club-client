import React from "react"
import PlaceholderCard from "./PlaceholderCard"
import Card, { ICardProps } from "./Card"
import ICard from "../../interfaces/Card"

interface ICardStackProps {
    cards: ICard[]
    handleCardClick?: (event: React.MouseEvent, 
                       suit: ICardProps["suit"], 
                       rank: ICardProps["rank"]) => void
}
const CardStack: React.FC<ICardStackProps> = (props) => {
    const [cards, setCards] = React.useState<JSX.Element[]>([])
    
    React.useEffect(() => {
        // TODO: Move this out
        const handleCardClick = (
            event: React.MouseEvent, 
            suit: ICardProps["suit"], 
            rank: ICardProps["rank"]
        ) => {
            if (props.handleCardClick)
                props.handleCardClick(event, suit, rank)
        }

        if (!props.cards || props.cards.length === 0) {
            setCards([<PlaceholderCard key="placeholder"/>])
        }
        else {
            setCards(props.cards.map((card) => { 
                return <Card 
                    key={`${card.suit},${card.rank}`} 
                    suit={card.suit} rank={card.rank} 
                    rotateDegree={0} 
                    handleClick={handleCardClick}
                />
                })
            )
        }
    }, [props])

    const classes = "stack"
    return (
    <React.Fragment>
        <div className={classes}>
            {cards}
        </div>
    </React.Fragment>
    )
}

export default CardStack