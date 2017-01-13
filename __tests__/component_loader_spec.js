import React from 'react'
import { shallow } from 'enzyme'

import Loader from '../src/components/Loader.jsx'

describe('Loader component', () => {

    let component

    beforeEach(() => {
        component = shallow(<Loader />)
    })

    it('Test if Loader component is empty', () => {
        expect(component.find('div').text()).toEqual('')
    })
  
    it('Check if Loader has correct class name', () => {
        expect(component.is('.loader')).toBe(true)
    })
})