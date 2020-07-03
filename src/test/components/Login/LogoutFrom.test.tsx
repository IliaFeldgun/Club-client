import React from 'react'
import ReactDOM from 'react-dom'
import LogoutForm from '../../../components/Login/LogoutForm'

describe('Testing LoginForm', () => {
    test('component renders', () => {
        const div = document.createElement('div')
        ReactDOM.render(<LogoutForm />, div)
    })
    
})