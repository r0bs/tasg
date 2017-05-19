import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTask } from '../actions/tasks'
import AddTask from '../components/AddTask'

class AddTaskContainer extends Component{

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
  }

  submitTask(title, date) {
    this.props.dispatch(addTask(title, date))
  }

  render() {
    return (
      <div>
        <AddTask submitTask={this.submitTask.bind(this)} />
      </div>
    )
  }
}

export default connect()(AddTaskContainer)