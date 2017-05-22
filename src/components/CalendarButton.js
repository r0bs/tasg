import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CalendarButton extends Component {

    static propTypes = {
        onClick: PropTypes.func,
        value: PropTypes.string
    }

    render() {

        const {
            value,
            placeholder,
            ...rest,
            } = this.props;

        return (
            <input type="button"
                {...rest}
                className="form-control"
                value={value}
                >
            </input>
        )
    }
}

export default CalendarButton;