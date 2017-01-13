import React from 'react'

/**
 * Box HOC component.
 */
export default function HocBox(WrappedComponent) {
    return class extends React.Component {

        /**
         * Create a HOC box.
         * @param {object} props - Component props.
         */
        constructor(props){
            super(props)
            this.state = {popover: false}
            this.togglePopover = this.togglePopover.bind(this)
        }

        /**
         * Mount a popover.
         * @return {ReactElement} The popover markup.
         */
        drawPopover(){
            if(!this.props.data){
                return
            }
            let content = null
            if(this.state.popover){
                content = (
                    <div className="popover" onClick={this.togglePopover}>
                        <h4>Additional information</h4>
                        <ul>
                            {this.props.data.info.map((item, i) => {
                                return <li key={i}><strong>{item.label}:</strong> {item.value}</li>
                            })}
                        </ul>
                    </div>
                )
            }
            return content
        }

        /**
         * Set popover visibility.
         */
        togglePopover(){
            this.setState({popover: !this.state.popover})
        }

        /**
         * render
         * @return {ReactElement} markup.
         */
        render(){
            return (
                <div onClick={this.togglePopover} className="box-wrapper">
                    <WrappedComponent {...this.props} />
                    {this.drawPopover()}
                </div>
            )
        }
    }
}