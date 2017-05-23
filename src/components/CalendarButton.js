import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flatpickr from 'flatpickr'


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
                ref={ref => {this.ref = ref; flatpickr(ref);}}
                >
            </input>
        )
    }
}

export default CalendarButton;