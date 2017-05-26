import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setDefaultTaskList, addTasklist } from '../actions/tasklists'
import TaskListsList from '../components/TaskListsList'
import AddList from '../components/AddList'

class Tasklists extends Component {

  render() {

    if(!this.props.initialLoginStatusChecked) {
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
          <TaskListsList selectDefaultList={this.props.selectDefaultList} tasklists={this.props.tasklists} />
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
  }
})

const mapStateToProps = (state) => ({
  tasklists: state.tasklists,
  isLoggedIn: state.server.loginStatus.isLoggedIn,
  initialLoginStatusChecked: state.server.loginStatus.initialLoginStatusChecked
  
})

export default connect(mapStateToProps,mapDispatchToProps)(Tasklists)