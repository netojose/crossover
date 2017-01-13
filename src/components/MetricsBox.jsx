import React from 'react'
import HocBox from './HOC/HocBox'

/**
 * Metrics box.
 */
class MetricsBox extends React.Component {

    /**
     * Create a Metric box.
     * @param {object} props - Component props.
     */
    constructor(props){
        super(props)
        this.drawArrow = this.drawArrow.bind(this)
    }

    /**
     * Create a arrow.
     * @param {string} label - Arrow label.
     * @param {string} key - Arrow value.
     * @return {ReactElement} markup.
     */
    drawArrow(label, key){
        return (
            <div className={"metric " + this.props.data[key].status}>
                <h4>{this.props.data[key].value}</h4>
                <p>{label}</p>
            </div>
        )
    }

    /**
     * render
     * @return {ReactElement} markup.
     */
    render(){
        const {data} = this.props
        return  !data ? (
            <div className="box empty"><h3>Metrics</h3></div>
        ) : (
            <div className={"box metrics " + (data.is_ok ? 'success' : 'error')}>
                <h3>Metrics</h3>
                {this.drawArrow('Test', 'test')}
                {this.drawArrow('Maintainability', 'maintainability')}
                {this.drawArrow('Security', 'security')}
                {this.drawArrow('Workmanship', 'workmanship')}
            </div>
        )
    }
}

MetricsBox.propTypes = {
    /**
     * Chart width.
     * @type {object}
     */
    data: React.PropTypes.object
}

export default HocBox(MetricsBox)