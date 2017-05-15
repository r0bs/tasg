import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTaskList, loginToGoogle, changeTask } from '../actions'
import TodoList from '../components/TodoList'


class VisibleTodoList extends Component {

  constructor(props) {
    super(props)
    this.dispatch = this.props.dispatch;
  }

  componentWillMount() {

    //this normally doesn't belong here
    this.dispatch(loginToGoogle())
    
    //this timeout is just for now
    setTimeout(
      ()=> {
        if(this.props.server.loginStatus.loggedIn) {
          this.dispatch(getTaskList("MTIwMTcwMjE0MDIyNjI5MDg4ODE6MDow"))
        }
      }, 
      1000
    )
  }

  componentDidMount() {
    
    
    
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
