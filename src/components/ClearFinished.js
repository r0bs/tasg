import { connect } from 'react-redux'
import { clearFinishedTasks } from '../actions/tasks'
import React from 'react'

export const ClearButton = (props) => {
    return(
        <div className="clearFinished">
            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => props.dispatch(clearFinishedTasks())}>
                Clear Finished
            </button>
        </div>
    )
}


export default connect()(ClearButton)