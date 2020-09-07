import React from 'react'
import EmptyCardFan from './EmptyCardFan'

import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles({
    name: {
        textShadow: '1px 2px darkgreen',
        color: 'white'
    }
})
interface IWizOtherPlayerProps {
    name: string
    cards: number
}
const WizOtherPlayer: React.FC<IWizOtherPlayerProps> = (props) => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <div>
                <div className={classes.name}>{props.name}</div>
                <div>
                    <EmptyCardFan amount={props.cards} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default WizOtherPlayer