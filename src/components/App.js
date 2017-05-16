import React from 'react'
import Filter from './Filter'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import VisibleLoginButton from '../containers/VisibleLoginButton'

const App = () => (
  <div>
    <VisibleLoginButton />
    <AddTodo />
    <Filter />
    <VisibleTodoList />
  </div>
)

export default App
