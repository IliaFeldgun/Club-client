import React from "react"

interface IRoomListProps {
    rooms: string[]
}
const RoomList: React.FunctionComponent<IRoomListProps> = (props) => {
    const [rooms, setRooms] = React.useState<JSX.Element[]>([])
    
    React.useEffect(() => {
        setRooms(props.rooms.map((room) => 
            <li key={room}>
                <a href={`/room/${room}`}>{room}</a>
            </li>    
        ))
    }, [props.rooms])
    
    return (
        <ol>
            {rooms}
        </ol>
    )
}

export default RoomList