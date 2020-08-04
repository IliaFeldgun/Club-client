import React from 'react'
import EmptyCardFan from './EmptyCardFan'

interface IWizOtherPlayerProps {
    name: string
    cards: number
    className: string
}
const WizOtherPlayer: React.FC<IWizOtherPlayerProps> = (props) => {
    return (
        <React.Fragment>
            <div className={props.className} >
                <div className="other-player-name">{props.name}</div>
                <div>
                    <EmptyCardFan amount={props.cards} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default WizOtherPlayer