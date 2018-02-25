import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setDefaultTaskList, addTasklist, removeTasklist } from '../actions/tasklists'
import TaskListsList from '../components/TaskListsList'
import AddList from '../components/AddList'

class Tasklists extends Component {
  

  render() {

    if(this.props.isCreatingList) {
      return(
        <div className="appload">
          <div className="loader" />
        </div>
      )
    }


    if(this.props.isLoggedIn) {
      return (
        <div>
          <h4><span className="glyphicon glyphicon-list"></span>  Lists</h4>
          <AddList addTasklist={this.props.addTasklist} />
          <TaskListsList 
            selectDefaultList={this.props.selectDefaultList} 
            removeTasklist={this.props.removeTasklist}
            tasklists={this.props.tasklists} />
        </div>
      )
    } else {
      return null
    }
    
  }

}

const mapDispatchToProps = (dispatch) => ({
  selectDefaultList: (tasklist) => {
    dispatch(setDefaultTaskList(tasklist))
  },
  addTasklist: (title) => {
    dispatch(addTasklist(title))
  },
  removeTasklist: (listId) => {
    dispatch(removeTasklist(listId))
  }
})

const mapStateToProps = (state) => ({
  tasklists: state.tasklists,
  isLoggedIn: state.server.loginStatus.isLoggedIn,
  initialLoginStatusChecked: state.server.loginStatus.initialLoginStatusChecked,
  isCreatingList: state.server.isCreatingList
})

export default connect(mapStateToProps, mapDispatchToProps)(Tasklists)