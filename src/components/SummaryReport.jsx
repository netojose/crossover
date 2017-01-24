import React from 'react'

import Api          from '../helpers/Api'
import Loader       from './Loader'
import ReportRow    from './ReportRow'

import '../styles/SummaryReport.scss'

/**
 * Summary report.
 */
class SummaryReport extends React.Component {

    /**
     * Create a Summary report component.
     * @param {object} props - Component props.
     */
    constructor(props){
        super(props)
        this.state = {items: null, error: false, expandedItem: null}
        this.toggleExpandItem = this.toggleExpandItem.bind(this)
    }

    /**
     * Hook called on before component creation.
     */
    componentWillMount(){
        Api.onSuccess(r => {
            this.setState({items: r})
        }).onError(() => {
            this.setState({error: true})
        }).get('/api/status-all.json')
    }

    toggleExpandItem(id){
        let newId = this.state.expandedItem == id ? null : id
        this.setState({expandedItem: newId})
    }

    /**
     * render
     * @return {ReactElement} markup.
     */
    render(){
        return (
            <div className="summary-report-wrapper">
                {(() => {
                    if(this.state.items === null && this.state.error === false){
                        return <Loader />
                    } else if (this.state.error) {
                        return <h2 className="summary-report error">A server error has occurred. Please, try again later.</h2>
                    } else {
                        return (
                            <div className="summary-report">
                                <ul className="headers">
                                    <li className="name">Changelist / Build</li>
                                    <li>Owner</li>
                                    <li className="time_started">Time Started</li>
                                    <li>State</li>
                                    <li className="metrics">Metrics</li>
                                    <li className="build">Build</li>
                                    <li className="unit_test">Unit Test</li>
                                    <li className="functional_test">Functional Test</li>
                                </ul>
                                
                                <ul className="report-items">
                                    {this.state.items.map(item => <ReportRow key={item.id} data={item} toggleExpand={this.toggleExpandItem} expanded={this.state.expandedItem == item.id} />)}
                                </ul>
                            </div>
                        )
                    }
                })()}
            </div>
        )
    }

}

export default SummaryReport