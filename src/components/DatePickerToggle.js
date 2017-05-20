import React from 'react'
import { PropTypes } from 'prop-types'

const DatePickerToggle = (props) => {
    return (
        <span>
            <span className="glyphicon glyphicon-calendar"
                onClick={props.onClick}>
            </span>
        </span>
    )
}

DatePickerToggle.propTypes = {
    onClick: PropTypes.func
}

export default DatePickerToggle