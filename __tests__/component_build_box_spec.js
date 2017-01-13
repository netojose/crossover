import React from 'react'
import { shallow } from 'enzyme'

import BuildBox from '../src/components/BuildBox.jsx'

describe('BuildBox component', () => {

    let component
    let data = {
        "time": "12:23am - 2/19/2014",
        "debug": "ok",
        "release": "error",
        "is_ok": false,
        "info": []
    }

    beforeEach(() => {
        component = shallow(<BuildBox data={data} />).find('BuildBox').shallow()
    })

    it('Test if time prop is rendered correctly', () => {
        expect(component.find('> p').text()).toEqual(data.time)
    })

    it('Check if Component has correct class name', () => {
        expect(component.find('div.build-machine.ok').length).toBe(1)
        expect(component.find('div.build-machine.error').length).toBe(1)
    })

    it('Popover open/close on component click', () => {
        component = shallow(<BuildBox title="Foo title" data={data} />)
        expect(component.find('.popover').length).toBe(0)
        component.simulate('click')
        expect(component.find('.popover').length).toBe(1)
        component.simulate('click')
        expect(component.find('.popover').length).toBe(0)
    });
})