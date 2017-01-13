import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import SummaryReport from '../src/components/SummaryReport.jsx'

describe('Summary Report component', () => {
    
    it('Check component rendering', () => {  
        let server = sinon.fakeServer.create()
        let response = JSON.stringify(require('../api/status-all.json'))
        server.respondWith( 'GET', '/api/status-all.json', response);
        let component = shallow(<SummaryReport />)
        expect(component.find('.summary-report-wrapper').length).toBe(1)
    })

})