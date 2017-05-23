import React from 'react'
import PropTypes from 'prop-types'

const DateInput = (props) => {
    return(
        <div>
            <input 
                value={props.value}
                className="form-control"
                onClick={props.onClick} />
        </div>
    )
}

DateInput.propTypes = {
    onClick: PropTypes.func
}

export default DateInput