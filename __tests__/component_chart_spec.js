import React from 'react'
import { mount } from 'enzyme'

import Chart from '../src/components/Loader.jsx'

describe('Chart component', () => {

    it('Check if props are correct', () => {
        const chart = mount(<Chart width={50} height={45} passed={10} error={15} />)
        expect(chart.prop('width')).toEqual(50)
        expect(chart.prop('height')).toEqual(45)
        expect(chart.prop('passed')).toEqual(10)
        expect(chart.prop('error')).toEqual(15)
    });

});