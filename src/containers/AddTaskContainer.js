import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions/tasks'
import AddTask from '../components/AddTask'

class AddTaskContainer extends Component{

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
  }

  submitTask(title, date) {
    this.props.dispatch(addTodo(title, date))
  }

  render() {
    return (
      <div>
        <AddTask submitTask={this.submitTask.bind(this)} />
      </div>
    )
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   submitTask: (title, date) => {
//     dispatch(addTodo(title, date))
//   }
// })

export default connect()(AddTaskContainer)