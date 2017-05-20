import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTask } from '../actions/tasks'
import { laodGoogleClientAsync } from '../actions/google'
import TaskList from '../components/TaskList'


class VisibleTaskList extends Component {

  constructor(props) {
    super(props)
    this.dispatch = this.props.dispatch;
    this.dispatch(laodGoogleClientAsync())
  }

  taskChange(id, prop, value) {
    this.dispatch(changeTask(id, prop, value))
  }

  render() {
    const {tasks} = this.props;
    return (
      <div>
        <TaskList tasks={tasks} taskChange={this.taskChange.bind(this)} />
      </div>
    )
  }

}

const getSearchedTasks = function(tasks, searchterm) {
  return tasks.filter(t => 
       (t.title || t.description).toLowerCase().indexOf(searchterm.toLowerCase()) !== -1
  )
}

const getStatusFilteredTasks = function(tasks, filter) {
    switch (filter) {
      case 'SHOW_ALL':
        return tasks
      case 'SHOW_COMPLETED':
        return tasks.filter(t => t.status === "completed")
      case 'SHOW_ACTIVE':
        return tasks.filter(t => t.status === "needsAction")
      default:
        return tasks
    }
  }


const mapStateToProps = (state) => ({
  server: state.server,
  tasks: getStatusFilteredTasks(getSearchedTasks(state.tasks, state.search), state.visibilityFilter)
})


export default connect(mapStateToProps)(VisibleTaskList)
