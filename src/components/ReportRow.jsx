import React from 'react'

import Loader               from './Loader'
import BuildBox             from './BuildBox'
import MetricsBox           from './MetricsBox'
import ChartBox             from './ChartBox'
import Ajax                 from '../helpers/Ajax'

import '../styles/ReportRow.scss'
import '../styles/boxes.scss'
import '../styles/animations.scss'

/**
 * Report row.
 */
class ReportRow extends React.Component {

    /**
     * Create a Report row.
     * @param {object} props - Component props.
     */
    constructor(props){
        super(props)
        this.state = {expanded: false, details: null, error: false}

        this.toggleExpand = this.toggleExpand.bind(this)
    }

    /**
     * Create status indicator.
     * @param {string} type - Indicator type.
     * @return {ReactElement} markup.
     */
    drawIndicator(type){
        const status = this.props.data[type].status
        const data = this.props.data
        if(status == 'running'){
            const perc = data[type].progress
            return <span className="indicator progress"><span style={{width: perc + '%'}}></span></span>
        } else {
            return <span className={"indicator " + status}></span>
        }
    }

    /**
     * Gert row color and status.
     * @return {Array} status.
     */
    getRowColorAndState() {
        const d = this.props.data
        const sList = [d.metrics.status, d.build.status, d.unit_test.status, d.functional_test.status]
        let conditions = []

        if(sList.find(i => i == 'failed')){
            conditions = ['failed', 'Rejected']
        } else if ((sList.filter(i => i == 'success')).length == 4){
            conditions = ['success', (d.complete ? 'Complete' : 'Accepted')]
        } else if ((sList.filter(i => i == 'running')).length > 0){
            conditions = ['running', 'Running']
        } else {
            conditions = ['pending', 'Pending']
        }
        
        return conditions
    }

    /**
     * Toggle row expanded status.
     */
    toggleExpand(){
        const [rowColor] = this.getRowColorAndState()
        if(rowColor == 'pending' || rowColor == 'running'){
            return
        }

        let {expanded} = this.state

        if(!expanded && this.state.details === null){
            this.loadDetails()
        }

        let changes = {expanded: !expanded}
        if(!changes.expanded){
            changes.error = false
        }

        this.setState(changes)
    }

    /**
     * Make a server call to retrieve data.
     */
    loadDetails(){
        Ajax.onSuccess(r => {
            this.setState({details: r})
        }).onError(() => {
            this.setState({error: true})
        }).get('/api/status-' + this.props.data.id + '.json')
    }

    /**
     * Mount a result box.
     * @return {ReactElement} markup.
     */
    drawResult(){
        const {metrics, build, functional_test, unit_test, result} = this.state.details
        const title = {rejected: <h4>Change Rejected</h4>, accepted: <h4>Change accepted</h4>, completed: null}
        return (
            <ul className="details-area">
                <li><MetricsBox data={metrics} /></li>
                <li><BuildBox data={build} /></li>
                <li><ChartBox data={unit_test} title="Unit Test" /></li>
                <li><ChartBox data={functional_test} title="Functional Test" /></li>
                <li className={"details-summary " + result.status}>
                    <p>Result:</p>
                    {title[result.status]}
                    <h3>{result.message}</h3>
                    <div className="control">
                        {(() => {
                            switch(result.status){
                                case 'rejected':
                                    return <button>Find Issues</button>
                                break
                                case 'accepted':
                                    return <button><span className="icon icon-search"></span> Merged Build</button>
                                break
                                case 'completed':
                                    return (
                                        <div>
                                            <p><button>Deploy</button> to:</p>
                                            <p>
                                                <select>
                                                    {result.environments.map((env, i) => {
                                                        return <option key={i}>{env}</option>
                                                    })}
                                                </select>
                                            </p>
                                        </div>
                                    )
                                break
                            }
                        })()}
                    </div>
                </li>
            </ul>
        )
    }

    /**
     * Get row details markup.
     * @return {ReactElement|null} markup.
     */
    getDetails(){
        let details
        if(this.state.error) {
            details = <div className="details-area error">A server error has occurred. Please, try again later.</div>
        } else if(!this.state.expanded){
            details = null
        } else if(this.state.details === null){
            details = <div className="details-area"><Loader /></div>
        } else if (this.state.details !== null){
            details = this.drawResult()
        }
        return details
    }

    /**
     * render
     * @return {ReactElement} markup.
     */
    render(){
        const {data} = this.props
        const [rowColor, state] = this.getRowColorAndState()
        let e = this.state.expanded
        return (
            <div className={"row-report " + rowColor}>
                <ul onClick={this.toggleExpand} className="summary headers">
                    <li className="name"><span className={"icon icon-" + data.type}></span> {data.name}</li>
                    <li>{data.owner}</li>
                    <li className="time_started">{data.time_started}</li>
                    <li>{state}</li>
                    <li className={"metrics " + (e ? 'hidden' : '')}>{this.drawIndicator('metrics')}</li>
                    <li className={"build " + (e ? 'hidden' : '')}>{this.drawIndicator('build')}</li>
                    <li className={"unit_test " + (e ? 'hidden' : '')}>{this.drawIndicator('unit_test')}</li>
                    <li className={"functional_test " + (e ? 'hidden' : '')}>{this.drawIndicator('functional_test')}</li>
                </ul>
                {this.getDetails()}
            </div>
        )
    }
}

ReportRow.propTypes = {
    /**
     * Row data.
     * @type {object}
     */
    data: React.PropTypes.object.isRequired
}

export default ReportRow