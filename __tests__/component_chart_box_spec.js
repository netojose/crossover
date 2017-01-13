import React from 'react'
import { shallow } from 'enzyme'

import ChartBox from '../src/components/ChartBox.jsx'

describe('ChartBox component', () => {

    let component
    let data = {
        "passed": 54,
        "error": 42,
        "code_covered": 76,
        "is_ok": true,
        "info": []
    }

    beforeEach(() => {
        component = shallow(<ChartBox title="Foo title" data={data} />).find('ChartBox').shallow()
    })

    it('Check if title is rendered', () => {
        expect(component.find('h3').text()).toEqual('Foo title')
    });

    it('Check if percentual is correctly calculated', () => {
        let percPassed = Math.round((data.passed * 100) / (data.passed + data.error))
        expect(component.find('.col').at(1).find('h4').text()).toEqual(percPassed + '%');
    });

    it('Popover open/close on component click', () => {
        component = shallow(<ChartBox title="Foo title" data={data} />)
        expect(component.find('.popover').length).toBe(0)
        component.simulate('click')
        expect(component.find('.popover').length).toBe(1)
        component.simulate('click')
        expect(component.find('.popover').length).toBe(0)
    });
  
});