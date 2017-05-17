import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTask, laodGoogleClientAsync } from '../actions'
import TodoList from '../components/TodoList'


class VisibleTodoList extends Component {

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
        <TodoList tasks={tasks} taskChange={this.taskChange.bind(this)} />
      </div>
    )
  }

}

const getVisibleTodos = function(tasks, filter) {
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
  tasks: getVisibleTodos(state.tasks, state.visibilityFilter)
})


export default connect(mapStateToProps)(VisibleTodoList)
