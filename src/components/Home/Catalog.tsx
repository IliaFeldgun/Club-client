import React from "react"
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    catalog: {
        float: 'left',
        padding: '1vmax',
        marginTop: '2vh',
        marginBottom: '2vh',
        marginRight: '2vw',
        marginLeft: '2vw',
        borderRadius: '6px',
        backgroundColor: 'whitesmoke',
        width: 'fit-content'
    },
    catalogItem: {
        textAlign: 'center'
    },
    catalogImg: {
        width: '15vw'
    }
})
interface ICatalogProps {
    games: {name: string, img: string, url: string}[]
}
const Catalog: React.FunctionComponent<ICatalogProps> = (props) => {
    const classes = useStyles()
    const games = props.games.map((game) => 
        <div key={game.url} className={classes.catalogItem}>
            <a href={game.url}>
                <img className={classes.catalogImg} src={game.img} alt={game.name}/>
                <div>{game.name}</div>
            </a>
        </div>

    )
    return (
        <div className={classes.catalog}>
            {games}
        </div>
    )
}
export default Catalog