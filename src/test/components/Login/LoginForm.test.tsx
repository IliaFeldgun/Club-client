import React from 'react'
import LoginForm from '../../../components/Login/LoginForm'
import { mount, render, shallow } from 'enzyme'

describe('Testing LoginForm', () => {
    test('component renders', () => {
        const component = shallow(<LoginForm />)
        expect(component).toMatchSnapshot()
    })
})