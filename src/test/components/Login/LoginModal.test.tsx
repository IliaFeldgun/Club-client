import React from 'react'
import ReactDOM from 'react-dom'
import LoginModal from '../../../components/Login/LoginModal'

describe('Testing LoginModal component', () => {
    test('component renders open', () => {
        const div = document.createElement('div')
        ReactDOM.render(<LoginModal show={true} />, div)
    })
    test('Component renders closed', () => {
        const div = document.createElement('div')
        ReactDOM.render(<LoginModal show={true} />, div)
    })
})