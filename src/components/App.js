import React from 'react'
import Filter from './Filter'
import AddTaskContainer from '../containers/AddTaskContainer'
import VisibleTodoList from '../containers/VisibleTodoList'
import VisibleLoginButton from '../containers/VisibleLoginButton'
import Tasklists from '../containers/Tasklists'

const App = () => (
  <div>
    <VisibleLoginButton />
    <AddTaskContainer />
    <Tasklists />
    <Filter />
    <VisibleTodoList />
  </div>
)

export default App
