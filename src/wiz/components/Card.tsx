import React, { CSSProperties } from "react"
import ICard, { Suit, Rank } from "../../interfaces/Card"
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    redCard: {
        color: 'red'
    },
    joker: {
        writingMode: 'vertical-lr',
        textOrientation: 'upright'
    },
    white: {
        backgroundColor: 'white'
    },
    card: {
        width: '12vmax',
        height: '18vmax',
        position: 'fixed',
        margin: '0',
        transformOrigin: 'left bottom',
        fontSize: '2.5vmax',
        fontFamily: 'sans-serif',
        lineHeight: '2.5vmax',
        borderStyle: 'double',
        borderWidth: 'thin',
        borderRadius: '5px',
        paddingLeft: '0.5vmax',
        userSelect: 'none',
        boxShadow: '5px 10px rgba(0,0,0,0.2)',
        '&:hover': {
            zIndex: '1000',
            // boxShadow: '3px 5px'
        }
    }
})

export interface ICardProps {
    rotateDegree: number
    suit: ICard["suit"]
    rank: ICard["rank"]
    handleClick?: (event: React.MouseEvent, suit: ICard["suit"], rank: ICard["rank"]) => void
}
const Card: React.FC<ICardProps> = (props) => {
    const classes = useStyles()
    const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        if (props.handleClick) {
            props.handleClick(event, props.suit, props.rank)
        }
    }
    const suit: string = translateSuit(props.suit)
    const rank: string = translateRank(props.rank)
    const classRed: string = isRed(props.suit) ? classes.redCard : ""

    const isJoker = props.rank === Rank.JOKER
    const classJoker = isJoker ? classes.joker : ""

    let rotate: CSSProperties = {}
    const degrees = props.rotateDegree
    const spread = degrees
    if (props.rotateDegree) {
        rotate = {transform: `rotate(${degrees}deg) translate(${spread}%,0)`}
    }

    const cssClasses = `${classes.white} ${classes.card} player-card ${classRed} ${classJoker}`
    const cardContent = <React.Fragment>
        {suit}
        {!isJoker && <br/>}
        {rank}
    </React.Fragment>
    
    return (
        <span className={cssClasses} style={rotate} onClick={handleClick}>
            {cardContent}
        </span>
    )
}

// TODO: move helper function to another class

const translateRank = (rank: Rank) : string  =>{
    let textRank: string
    
    if (rank <= 10 && rank >= 2) {
        textRank = rank.toString()
    }
    else if (rank === Rank.JOKER) {
        textRank = "JOKER"
    }
    else {
        textRank = Rank[rank].charAt(0)
    }
    
    return textRank
}
const translateSuit = (suit: Suit) : string  => {
    let textSuit: string
    switch(suit) {
        case Suit.SPADE:
            textSuit = "♠"
            break
        case Suit.HEART:
            textSuit = "♥"
            break
        case Suit.CLUB:
            textSuit = "♣"
            break
        case Suit.DIAMOND:
            textSuit = "♦"
            break
    }

    return textSuit
}

const isRed = (suit: Suit) : boolean => {
    return suit === Suit.HEART || suit === Suit.DIAMOND
}

export default Card