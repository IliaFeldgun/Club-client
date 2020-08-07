import React from 'react'
import { Suit } from '../../interfaces/Card'
import Tooltip from '../../components/Tooltip'
import {createUseStyles} from 'react-jss'
const useStyles = createUseStyles({
    red: {
        color: 'red'
    },
    strongSuit: {
        fontSize: '10vh',
        position: 'absolute',
        bottom: '0',
        marginLeft: '1vw',
        zIndex: '101',
        userSelect: 'none', 
        textShadow: '0.25vh 0.5vh darkgreen',
    }
})

interface IStrongSuitProps {
    strongSuit: Suit
}
const StrongSuit: React.FC<IStrongSuitProps> = (props) => {
    const classes = useStyles()
    const [displayTooltip, setDisplayTooltip] = React.useState(false)
    const suit = translateSuit(props.strongSuit)
    const redClass = isRed(props.strongSuit) ? classes.red : ""
    const handleMouseOver = () => {
        setDisplayTooltip(true)
    }
    const handleMouseOut = () => {
        setDisplayTooltip(false)
    }
    return (
        <span 
            className={`${classes.strongSuit} ${redClass}`} 
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {suit}
            <Tooltip display={displayTooltip}>Strong suit</Tooltip>
        </span>
    )
}

// TODO: move helper function to another class

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

export default StrongSuit