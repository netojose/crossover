import React from 'react'
import { shallow } from 'enzyme'

import MetricsBox from '../src/components/MetricsBox.jsx'

describe('MetricsBox component', () => {

    let component
    let data

    beforeEach(() => {
        data = {
            "test": {
                "value": 64,
                "status": "ok"
            },
            "maintainability": {
                "value": 53,
                "status": "warning"
            },
            "security": {
                "value": 27,
                "status": "error"
            },
            "workmanship": {
                "value": 80,
                "status": "ok"
            },
            "is_ok": true,
            "info": []
        }
        
        component = shallow(<MetricsBox data={data} />).find('MetricsBox').shallow()
    })

    it('Test Metris Box status', () => {
        expect(component.find('div.box.metrics.' + (data.is_ok ? 'success' : 'error')).length).toBe(1)
    })

    it('Check "Test" arrow', () => {
        expect(component.find('div.metric').at(0).hasClass(data.test.status))
        expect(component.find('div.metric').at(0).find('h4').text()).toBe("" + data.test.value)
    })

    it('Check "Maintainability" arrow', () => {
        expect(component.find('div.metric').at(1).hasClass(data.maintainability.status))
        expect(component.find('div.metric').at(1).find('h4').text()).toBe("" + data.maintainability.value)
    })
    
    it('Check "Security" arrow', () => {
        expect(component.find('div.metric').at(2).hasClass(data.security.status))
        expect(component.find('div.metric').at(2).find('h4').text()).toBe("" + data.security.value)
    })
    
    it('Check "Workmanship" arrow', () => {
        expect(component.find('div.metric').at(3).hasClass(data.workmanship.status))
        expect(component.find('div.metric').at(3).find('h4').text()).toBe("" + data.workmanship.value)
    })
})