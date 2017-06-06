import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTask } from '../actions/tasks'
import Tasks from '../components/Tasks'


class TasksContainer extends Component {

  constructor(props) {
    super(props)
    this.dispatch = this.props.dispatch;
  }

  taskChange(id, prop, value) {
    this.dispatch(changeTask(id, prop, value))
  }

  render() {
    const {tasks, server, searchterm} = this.props;
    return (
        <Tasks tasks={tasks} searchterm={searchterm} isFetching={server.isFetching}  taskChange={this.taskChange.bind(this)} />
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
  searchterm: state.search,
  server: state.server,
  tasks: getStatusFilteredTasks(getSearchedTasks(state.tasks, state.search), state.visibilityFilter)
})


export default connect(mapStateToProps)(TasksContainer)
