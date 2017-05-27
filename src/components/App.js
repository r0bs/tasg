import React from 'react'
import Filter from './Filter'
import Search from '../containers/Search'
import AddTaskContainer from '../containers/AddTaskContainer'
import VisibleTaskList from '../containers/VisibleTaskList'
import VisibleLoginButton from '../containers/VisibleLoginButton'
import Tasklists from '../containers/Tasklists'
import Sidebar from '../components/Sidebar'

const App = (props) => (
  <div className="container-fluid">
    <div className="row">
    
      <Sidebar menuToggled={props.menuToggled}>
        <VisibleLoginButton />
        <Filter />
        <Search />
        <Tasklists />
      </Sidebar>

      <div className="main">
        <AddTaskContainer />
        <VisibleTaskList />
      </div>

    </div>
  </div>
)

export default App
