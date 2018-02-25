import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TaskCheckBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status: this.props.status === "completed"
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.status !== this.state.status;
    }

    check(event){
        this.setState({status: event.target.checked});
        this.props.check();
    }

    render() {
        return(
            <input type="checkbox"
                ref={node => this.li = node } 
                checked={this.state.status}
                onChange={this.check.bind(this)}
                style={{
                    margin: "3px",
                    marginRight: "7px"
                }}
                />
        )
    }

}

TaskCheckBox.propTypes = {
    status: PropTypes.string.isRequired,
    check: PropTypes.func.isRequired
}