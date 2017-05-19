import React from 'react'
import Filter from './Filter'
import AddTaskContainer from '../containers/AddTaskContainer'
import VisibleTaskList from '../containers/VisibleTaskList'
import VisibleLoginButton from '../containers/VisibleLoginButton'
import Tasklists from '../containers/Tasklists'

const App = () => (
  <div>
    <h3>Login</h3>
    <VisibleLoginButton />
    <h3>Add Tasks</h3>
    <AddTaskContainer />
    <h3>Lists</h3>
    <Tasklists />
    <h3>Filter & Suche</h3>
    <Filter />
    <h3>Tasks</h3>
    <VisibleTaskList />
  </div>
)

export default App
