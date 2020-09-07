import React from "react"
import PlaceholderCard from "./PlaceholderCard"
import Card, { ICardProps } from "./Card"

import ICard from "../../interfaces/Card"

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    stack: {
        display: 'flex',
        gridColumn: '5',
        gridRow: '4',
        // transform: 'translate(-50%, -50%)',
        position: 'absolute',
        '& span': {
            position: 'relative',
            marginRight: '-13vmax',
            boxShadow: '2px 3px rgba(0,0,0,0.2)'
        },
        '&:hover span': {
            marginRight: '-10vmax'
        }
    }
})
interface ICardStackProps {
    cards: ICard[]
    handleCardClick?: (event: React.MouseEvent,
        suit: ICardProps["suit"],
        rank: ICardProps["rank"]) => void
}
const CardStack: React.FC<ICardStackProps> = (props) => {
    const classes = useStyles()
    const [cards, setCards] = React.useState<JSX.Element[]>([])

    const handleCardClick = React.useCallback((
        event: React.MouseEvent,
        suit: ICardProps["suit"],
        rank: ICardProps["rank"]
    ) => {
        if (props.handleCardClick)
            props.handleCardClick(event, suit, rank)
    }, [props])

    React.useEffect(() => {
        if (!props.cards || props.cards.length === 0) {
            setCards([<PlaceholderCard key="placeholder" />])
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
    }, [props, handleCardClick])

    return (
        <React.Fragment>
            <div className={classes.stack}>
                {cards}
            </div>
        </React.Fragment>
    )
}

export default CardStack