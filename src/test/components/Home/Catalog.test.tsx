import React from 'react'
import ReactDOM from 'react-dom'
import Catalog from '../../../components/Home/Catalog'
import wizGameImage from '../../../img/WizClub2Small.png'

describe('Testing Catalog component', () => {
    test('Renders with props', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Catalog games={[
            {name: "Wizard", img: wizGameImage, url: "/"}
        ]}/>, div)
    })
    test('Renders with fake image', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Catalog games={[
            {name: "Lies", img: "/lies", url: "/"}
        ]}/>, div)
    })
    test('Renders without games', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Catalog games={[
        ]}/>, div)
    })
    test('Renders with multiple games', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Catalog games={[
            {name: "Wizard", img: wizGameImage, url: "/w"},
            {name: "Gizard", img: wizGameImage, url: "/g"},
            {name: "Lizard", img: wizGameImage, url: "/l"},
            {name: "Kizard", img: wizGameImage, url: "/k"},
            {name: "Sizard", img: wizGameImage, url: "/s"}
        ]}/>, div)
    })
})