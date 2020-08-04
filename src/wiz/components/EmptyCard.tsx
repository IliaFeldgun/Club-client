import React, { CSSProperties } from 'react'

interface IEmptyCardProps {
    rotateDegree: number
}
const EmptyCard: React.FC<IEmptyCardProps> = (props) => {
    const classes = `blue other-card`
    const rotate: CSSProperties = {transform: `rotate(${props.rotateDegree}deg)`}

    return (<p className={classes} style={rotate} />)
}

export default EmptyCard