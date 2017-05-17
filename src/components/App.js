import React from 'react'
import Filter from './Filter'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import VisibleLoginButton from '../containers/VisibleLoginButton'
import Tasklists from '../containers/Tasklists'

const App = () => (
  <div>
    <VisibleLoginButton />
    <AddTodo />
    <Tasklists />
    <Filter />
    <VisibleTodoList />
  </div>
)

export default App
