import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setDefaultTaskList, addTasklist } from '../actions/tasklists'
import TaskListsDropDown from '../components/TaskListsDropDown'
import AddList from '../components/AddList'

class Tasklists extends Component {

  render() {
    return (
      <div>
        <TaskListsDropDown selectDefaultList={this.props.selectDefaultList} tasklists={this.props.tasklists} />
        <AddList addTasklist={this.props.addTasklist} />
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