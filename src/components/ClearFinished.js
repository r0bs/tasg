import { connect } from 'react-redux'
import { clearFinishedTasks } from '../actions/tasks'
import React from 'react'

export const ClearButton = (props) => {
    return(
        <div className="clearFinished inline">
            <span className="label label-default filter"
                onClick={() => props.dispatch(clearFinishedTasks())}>
                Clear Finished
            </span>
        </div>
    )
}

export default connect()(ClearButton)