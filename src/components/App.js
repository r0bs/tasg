import React from 'react'
import Filter from './Filter'
import Search from '../containers/Search'
import AddTaskContainer from '../containers/AddTaskContainer'
import VisibleTaskList from '../containers/VisibleTaskList'
import VisibleLoginButton from '../containers/VisibleLoginButton'
import Tasklists from '../containers/Tasklists'

const App = () => (
  <div className="container-fluid">
    <div className="row">

      <div className="sidebar">
        <VisibleLoginButton />
        <Filter />
        <Search />
        <Tasklists />
      </div>

      <div className="main">
        <AddTaskContainer />
        <VisibleTaskList />
      </div>

    </div>
  </div>
)

export default App
