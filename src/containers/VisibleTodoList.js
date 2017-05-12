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
    if(this.props.google.loginStatus.loggedIn) {
      this.dispatch(getTaskList("MTIwMTcwMjE0MDIyNjI5MDg4ODE6MDow"))
    } else {
      console.error("Tried to retrieve task list from Google though user is NOT signed in!")
    }
  }

  render() {
    const {tasks} = this.props;
    console.log("güle güle", this.props)

    return (
      <div>
        <TodoList tasks={tasks} />
      </div>
    )
  }

}


const mapStateToProps = (state) => ({
  google: state.google,
  tasks: state.tasks
})


export default connect(mapStateToProps)(VisibleTodoList)
