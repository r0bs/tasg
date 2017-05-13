import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTaskList, loginToGoogle } from '../actions'
import TodoList from '../components/TodoList'


class VisibleTodoList extends Component {

  constructor(props) {
    super(props)
    this.dispatch = this.props.dispatch;
  }

  componentWillMount() {
    this.dispatch(loginToGoogle())
  }

  componentDidUpdate() {
    if(this.props.server.loginStatus.loggedIn) {
      this.dispatch(getTaskList("MTIwMTcwMjE0MDIyNjI5MDg4ODE6MDow"))
    }
  }

  render() {
    const {tasks} = this.props;
    return (
      <div>
        <TodoList tasks={tasks} />
      </div>
    )
  }

}


const mapStateToProps = (state) => ({
  server: state.server,
  tasks: state.tasks
})


export default connect(mapStateToProps)(VisibleTodoList)
