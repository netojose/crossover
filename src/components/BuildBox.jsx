import React from 'react'
import HocBox from './HOC/HocBox'

/**
 * Box to display build status.
 */
class BuildBox extends React.Component {

    /**
     * render
     * @return {ReactElement} markup.
     */
    render(){
        const {data} = this.props
        return  !data ? (
            <div className="box empty"><h3>Build</h3></div>
        ) : (
            <div className={"box build " + (data.is_ok ? 'success' : 'error')}>
                <h3>Build</h3>
                <div className={"build-machine " + data.debug}>
                    <span className="icon icon-build"></span>
                    <p>Debug</p>
                </div>
                <div className={"build-machine " + data.release}>
                    <span className="icon icon-build"></span>
                    <p>Release</p>
                </div>
                <p>{data.time}</p>
            </div>
        )
    }
}

BuildBox.propTypes = {
    /**
     * Info about build.
     * @type {object}
     */
    data: React.PropTypes.object.isRequired
}

export default HocBox(BuildBox)