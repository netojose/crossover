import React from 'react'

import HocBox from './HOC/HocBox'
import Chart from './Chart'

/**
 * Box with chart inside.
 */
class ChartBox extends React.Component {

    /**
     * render
     * @return {ReactElement} markup.
     */
    render(){
        let {code_covered, passed, error, is_ok} = (this.props.data || {})
        let percPassed = null
        if(this.props.data){
            percPassed = Math.round((passed * 100) / (passed + error))
        }
        
        return  !this.props.data ? (
            <div className="box empty"><h3>{this.props.title}</h3></div>
        ) : (
            <div className={"box chart-box " + (is_ok ? 'success' : 'error')}>
                <h3>{this.props.title}</h3>
                <div className="col">
                    <Chart width={90} height={90} passed={passed} error={error} />
                </div>
                <div className="col">
                    <h4 className={percPassed >= 50 ? 'ok' : 'warning'}>{percPassed}%</h4>
                    <p>tests passed</p>
                </div>
                <div className="progress-bar" style={{background: 'linear-gradient(to right, #c6dfb5 0%, #c6dfb5 ' + code_covered + '%, #f6cbae ' + code_covered + '%, #f6cbae 100%)'}}>
                    <h4 className={code_covered >= 50 ? 'ok' : 'warning'}>{code_covered}%</h4>
                    <p>code covered</p>
                </div>
            </div>
        )
    }
}

ChartBox.propTypes = {
    /**
     * Box title.
     * @type {string}
     */
    title: React.PropTypes.string.isRequired,

    /**
     * Box data.
     * @type {object|null}
     */
    data: React.PropTypes.object
}

export default HocBox(ChartBox)