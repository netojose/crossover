import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import ReportRow from '../src/components/ReportRow.jsx'

describe('ReportRow component', () => {

    let component
    let data = {
        "id": 13,
        "type": "firewall",
        "name": "CORP",
        "owner": "Miacel",
        "time_started": "4/18/2014 12:23pm",
        "metrics": {
            "status": "waiting"
        },
        "build": {
            "status": "success"
        },
        "unit_test": {
            "status": "failed"
        },
        "functional_test": {
            "status": "waiting"
        }
    }

    let server = sinon.fakeServer.create()
    let response = JSON.stringify(require('../api/status-12.json'))
    server.respondWith( 'GET', '/api/status-12.json', response);

    beforeEach(() => {
        component = shallow(<ReportRow data={data} />)
    })

    it('Check if row is rendered', () => {
        expect(component.hasClass('row-report')).toBe(true)
    })
  
    it('Check indicators', () => {
        expect(component.find('li.metrics .indicator.' + data.metrics.status).length).toBe(1)
        expect(component.find('li.build .indicator.' + data.build.status).length).toBe(1)
        expect(component.find('li.unit_test .indicator.' + data.unit_test.status).length).toBe(1)
        expect(component.find('li.functional_test .indicator.' + data.functional_test.status).length).toBe(1)
    })

    it('Check row toggle and ajax call', () => {
        expect(component.state('expanded')).toBe(false)
        expect(component.find('.details-area').length).toBe(0)
        component.find('ul').simulate('click')
        expect(component.state('expanded')).toBe(true)
        expect(component.find('.details-area').length).toBe(1)
    })
})