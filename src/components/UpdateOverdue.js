import { connect } from 'react-redux'
import { updateOverdueTasks } from '../actions/tasks'
import React from 'react'

export const UpdateOverdueButton = (props) => {
    return(
        <div className="updateOverdue inline">
            <span className="label label-default filter"
                onClick={() => props.dispatch(updateOverdueTasks(props.tasks))}>
                Update Overdue
            </span>
        </div>
    )
}

const mapStateToProps = (state) => ({
    tasks: state.tasks,
  })

export default connect(mapStateToProps)(UpdateOverdueButton)