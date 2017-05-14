import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CalendarButton extends Component {

    static propTypes = {
        onClick: PropTypes.func,
        value: PropTypes.string
    }

    render() {
        return (
            <button
                className="example-custom-input"
                onClick={this.props.onClick}>
                Select Date
            </button>
        )
    }
}

export default CalendarButton;