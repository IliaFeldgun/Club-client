import React from 'react'

import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles({
    gameSelect: {
        fontSize: 'inherit',
        borderRadius: '3px'
    }
})
interface IGameDropDownProps {
    gameNames: string[]
    handleSelection: (gameName: string) => void
}
const GameDropDown: React.FC<IGameDropDownProps> = (props) => {
    const classes = useStyles()
    const [games, setGames] = React.useState<JSX.Element[]>([])

    React.useEffect(() => {
        setGames(props.gameNames.map((game) => {
            return <option key={game} value={game}>{game}</option>
        }))
    }, [props.gameNames])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const name = event.target.value
        props.handleSelection(name)
    }
    return (
        <React.Fragment>
            <div>Select the game you wish to start: </div>
            <select
                className={classes.gameSelect}
                name="games"
                onChange={handleChange}
            >
                {games}
            </select>
        </React.Fragment>
    )
}

export default GameDropDown