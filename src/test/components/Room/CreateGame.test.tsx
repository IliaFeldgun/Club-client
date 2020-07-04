import React from 'react'
import ReactDOM from 'react-dom'
import CreateGame from '../../../components/Room/RoomGame/CreateGame'

describe('Testing game creation component', () => {
    test('component renders', () => {
        const div = document.createElement('div')
        ReactDOM.render(<CreateGame gameName="Clouter" roomId="00000000" />, div)
    })
})