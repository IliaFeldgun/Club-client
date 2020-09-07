import React from "react"
import Card, { ICardProps } from "./Card"

import ICard from "../../interfaces/Card"

import { createUseStyles } from 'react-jss'
import tooltipClasses from '../../style/tooltipClasses'
const useStyles = createUseStyles({
    ...tooltipClasses,
    fan: {
        gridRow: '9',
        gridColumn: '5',
        zIndex: '101',
        transform: 'translate(-50%, -100%)',
        position: 'relative',
        '& span:hover': {
            zIndex: '1000',
            // boxShadow: '3px 5px'
        }
    },
    playCard: {
        animationDuration: '0.5s',
        animationTimingFunction: 'cubic-bezier(.62,1.18,.75,.79)',
        animationFillMode: 'forwards',
    },
    right: {
        animationName: '$to-stack, $rotate-right'
    },
    left: {
        animationName: '$to-stack, $rotate-left'
    },
    '@keyframes to-stack': {
        '0%': {
            bottom: '0vh'
        },
        '50%': {
            bottom: '30vh'
        },
        '100%': {
            bottom: '40vh'
        }
    },
    '@keyframes rotate-right': {
        '0%': {},
        '50%': {
            transform: 'rotate3d(0, 0, 0.1, 0.1turn), scale(2)'
        },
        '100%': {
            transform: 'rotate3d(0, 0, 0.1, 0.1turn)'
        }
    },
    '@keyframes rotate-left': {
        '0%': {},
        '50%': {
            transform: 'rotate3d(0, 0, 0.1, -0.1turn), scale(2)'
        },
        '100%': {
            transform: 'rotate3d(0, 0, 0.1, -0.1turn)'
        }
    }
})

interface ICardFanProps {
    yourTurn: boolean
    cards: Array<{ suit: ICardProps["suit"], rank: ICardProps["rank"] }>
    handleCardClick?: (
        event: React.MouseEvent,
        suit: ICardProps["suit"],
        rank: ICardProps["rank"]
    ) => void
}
const CardFan: React.FC<ICardFanProps> = (props) => {
    const classes = useStyles()
    const [cards, setCards] = React.useState<JSX.Element[]>([])

    const handleCardClick = React.useCallback((event: React.MouseEvent, suit: ICardProps["suit"], rank: ICardProps["rank"]) => {
        if (props.yourTurn) {
            let cssClasses = [classes.playCard]
            Math.round(Math.random()) ? cssClasses.push(classes.right) : cssClasses.push(classes.left)
            event.currentTarget.classList.add(cssClasses[0], cssClasses[1])
            if (props.handleCardClick)
                props.handleCardClick(event, suit, rank)
        }
    }, [props, classes])

    React.useEffect(() => {
        if (props.cards.length && props.cards && props.cards[0]) {
            const totalCards = props.cards.length
            const increment = 10
            const firstDegree = (-1) * increment * ((totalCards % 2) ? (totalCards - 1) / 2 : totalCards / 2)
            let currentDegree = firstDegree

            setCards(props.cards.map((card: ICard) => {
                const currentRotate = currentDegree
                currentDegree += increment
                return <Card
                    key={`${card.suit},${card.rank}`}
                    suit={card.suit} rank={card.rank}
                    rotateDegree={currentRotate}
                    handleClick={handleCardClick}
                />
            }))
        }
        else {
            setCards([<React.Fragment />])
        }
    }, [props, handleCardClick])

    let wrongTurnTooltip = <React.Fragment />
    if (!props.yourTurn) {
        wrongTurnTooltip =
            <span className={classes.tooltip}>
                Wait for your turn
            </span>
    }

    return (
        <div className={`${classes.fan} ${classes.tooltipTarget}`}>
            {wrongTurnTooltip}
            {cards}
        </div>
    )
}

export default CardFan