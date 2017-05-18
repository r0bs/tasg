import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setDefaultTaskList, addTasklist } from '../actions'
import TaskListsDropDown from '../components/TaskListsDropDown'
import AddTasklist from '../components/AddTasklist'

class Tasklists extends Component {

  render() {
    return (
      <div>
        <TaskListsDropDown selectDefaultList={this.props.selectDefaultList} tasklists={this.props.tasklists} />
        <AddTasklist addTasklist={this.props.addTasklist} />
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => ({
  selectDefaultList: (tasklist) => {
    dispatch(setDefaultTaskList(tasklist))
  },
  addTasklist: (title) => {
    dispatch(addTasklist(title))
  }
})

const mapStateToProps = (state) => ({
  tasklists: state.tasklists
})

export default connect(mapStateToProps,mapDispatchToProps)(Tasklists)