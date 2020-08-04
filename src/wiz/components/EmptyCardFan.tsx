import React from 'react'
import EmptyCard from './EmptyCard'

interface IEmptyCardFanProps {
    amount: number
}
const EmptyCardFan: React.FC<IEmptyCardFanProps> = (props) => {
    const [cards, setCards] = React.useState<JSX.Element[]>([])

    React.useEffect(() => {
        const totalCards = props.amount
        const increment = 10
        const firstDegree = (-1) * increment * ((totalCards % 2) ? (totalCards-1)/2 : totalCards/2)
        const newCards: JSX.Element[] = []

        for (let i = 0; i < props.amount; i++) {
            newCards.push(<EmptyCard key={Math.random()} rotateDegree={firstDegree + (increment * i)}/>)
        }
        setCards(newCards)
    }, [props.amount])

    return (
        <React.Fragment>
            <React.Fragment>
                {cards}
            </React.Fragment>
        </React.Fragment>
    )
}

export default EmptyCardFan