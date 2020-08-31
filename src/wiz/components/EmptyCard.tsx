import React, { CSSProperties } from 'react'
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    blue: {
        background: 'royalblue'
    },
    otherCard: {
        width: '2vmax',
        height: '3vmax',
        position: 'absolute',
        margin: '0',
        transformOrigin: 'left bottom',
        fontSize: '0.416666667vmax',
        fontFamily: 'sans-serif',
        borderStyle: 'ridge',
        borderRadius: '5px',
        borderWidth: 'thin',
        paddingLeft: '0.5vmax',
        userSelect: 'none',
        boxShadow: '0.25vmax 0.5vmax rgba(0,0,0,0.2)',
    }
})

interface IEmptyCardProps {
    rotateDegree: number
}
const EmptyCard: React.FC<IEmptyCardProps> = (props) => {
    const classes = useStyles()
    const rotate: CSSProperties = {transform: `rotate(${props.rotateDegree}deg)`}

    return (<span className={`${classes.blue} ${classes.otherCard}`} style={rotate} />)
}

export default EmptyCard