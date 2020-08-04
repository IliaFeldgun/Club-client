import React from "react"
import "./Home.css"
import Description from "../components/Home/Description"
import Catalog from "../components/Home/Catalog"
import wizGameImage from '../img/WizClub2Small.png'

const Home: React.FC = () => {
    const [roomId, setRoomId] = React.useState("")

    return (
        <React.Fragment>
            <Description/>
            <Catalog games={[{name: "Wizard", url: "/room",
                                img: wizGameImage}]} />
        </React.Fragment>
    )
}

export default Home