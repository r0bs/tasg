import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CalendarButton extends Component {

    static propTypes = {
        onClick: PropTypes.func,
        value: PropTypes.string
    }

    render() {
        return (
            <span
                className="glyphicon glyphicon-calendar"
                onClick={this.props.onClick}>
            </span>
        )
    }
}

export default CalendarButton;