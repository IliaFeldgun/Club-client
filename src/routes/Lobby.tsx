import React from "react"
import RoomList from "../components/RoomList"

const Lobby: React.FC = () => {
    const [rooms, setRooms] = React.useState<string[]>([])
    React.useEffect(() => {
        setRooms([])
    }, [])
    return (
        <RoomList rooms={rooms}/>
    )
}

export default Lobby