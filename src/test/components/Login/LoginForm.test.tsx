import React from 'react'
import ReactDOM from 'react-dom'
import LoginForm from '../../../components/Login/LoginForm'

test('component renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<LoginForm className=""/>, div)
})