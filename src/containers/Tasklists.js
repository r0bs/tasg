import { connect } from 'react-redux'
import { setDefaultTaskList } from '../actions'
import TaskListsDropDown from '../components/TaskListsDropDown'

const mapDispatchToProps = (dispatch) => ({
  selectDefaultList: (tasklist) => {
    dispatch(setDefaultTaskList(tasklist))
  }
})

const mapStateToProps = (state) => ({
  tasklists: state.tasklists.all
})

export default connect(mapStateToProps,mapDispatchToProps)(TaskListsDropDown)