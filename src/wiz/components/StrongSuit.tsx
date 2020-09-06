import React from 'react'
import { Suit } from '../../interfaces/Card'
import { createUseStyles } from 'react-jss'
import tooltipClasses from '../../style/tooltipClasses'
const useStyles = createUseStyles({
    ...tooltipClasses,
    red: {
        color: 'red'
    },
    strongSuit: {
        fontSize: '10vh',
        marginLeft: '1vw',
        zIndex: '101',
        userSelect: 'none',
        textShadow: '0.25vh 0.5vh darkgreen',
        gridColumn: '1',
        gridRow: '9',
        lineHeight: '0',
        position: 'relative',
        transform: 'translate(0, 50%)'
    }
})

interface IStrongSuitProps {
    strongSuit: Suit
}
const StrongSuit: React.FC<IStrongSuitProps> = (props) => {
    const classes = useStyles()
    const suit = translateSuit(props.strongSuit)
    const redClass = isRed(props.strongSuit) ? classes.red : ""
    return (
        <span className={
            `${classes.strongSuit} ${classes.tooltipTarget} ${redClass}`
        }>
            {suit}
            <span className={classes.tooltip}>Strong suit</span>
        </span>
    )
}

// TODO: move helper function to another class

const translateSuit = (suit: Suit): string => {
    let textSuit: string
    switch (suit) {
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

const isRed = (suit: Suit): boolean => {
    return suit === Suit.HEART || suit === Suit.DIAMOND
}

export default StrongSuit