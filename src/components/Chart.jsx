import React from 'react'
import { Pie } from 'react-chartjs-2'

/**
 * Pie Chart.
 */
class Chart extends React.Component {

    /**
     * render
     * @return {ReactElement} markup.
     */
    render(){
        let data = {
            labels: [
                "Passed",
                "Error"
            ],
            datasets: [
                {
                    data: [this.props.passed, this.props.error],
                    borderWidth: [1, 1],
                    backgroundColor: [
                        "#72ac4d",
                        "#eb7d3b"
                    ],
                    hoverBackgroundColor: [
                        "#95E065",
                        "#FAC09D"
                    ]
                }]
        };

        let options = {
            maintainAspectRatio: false,
            legend: {
                display: false
            }
        }

        return (
            <div>
                <div>
                    <Pie data={data} width={this.props.width} height={this.props.height} data={data} options={options} />
                </div>
                <div>
                </div>
            </div>

        )
    }
}

Chart.propTypes = {
    /**
     * Chart width.
     * @type {number}
     */
    width: React.PropTypes.number.isRequired,

    /**
     * Chart height.
     * @type {number}
     */
    height: React.PropTypes.number.isRequired,

    /**
     * Number of tests passed.
     * @type {number}
     */
    passed: React.PropTypes.number.isRequired,

    /**
     * Number of tests failed.
     * @type {number}
     */
    error: React.PropTypes.number.isRequired
}

export default Chart