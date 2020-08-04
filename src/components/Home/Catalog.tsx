import React from "react"
import "./Catalog.css"
interface ICatalogProps {
    games: {name: string, img: string, url: string}[]
}
const Catalog: React.FunctionComponent<ICatalogProps> = (props) => {
    const games = props.games.map((game) => 
        <div key={game.url} className="catalog-item">
            <a href={game.url}>
                <img src={game.img} alt={game.name}/>
                <div>{game.name}</div>
            </a>
        </div>

    )
    return (
        <div className="catalog container">
            {games}
        </div>
    )
}
export default Catalog