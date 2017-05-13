import { combineReducers } from 'redux'
import tasks from './tasks'
import server from './loginstatus'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  tasks,
  visibilityFilter,
  server
})

export default todoApp