import React from 'react'
import { mount, render, shallow } from 'enzyme'
import LogoutForm from '../../../components/Login/LogoutForm'

describe('Testing LogoutForm', () => {
    test('component renders', () => {
        const component = shallow(<LogoutForm  />)
        expect(component).toMatchSnapshot()
    })
    
})