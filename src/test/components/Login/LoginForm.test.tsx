import React from 'react'
import ReactDOM from 'react-dom'
import LoginForm from '../../../components/Login/LoginForm'

describe('Testing LoginForm', () => {
    test('component renders', () => {
        const div = document.createElement('div')
        ReactDOM.render(<LoginForm className=""/>, div)
    })
    test('Component renders without props', () => {
        const div = document.createElement('div')
        ReactDOM.render(<LoginForm />, div)
    })
})