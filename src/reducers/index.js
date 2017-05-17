import { combineReducers } from 'redux'
import tasklists from './lists'
import tasks from './tasks'
import server from './loginstatus'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  tasklists,
  tasks,
  visibilityFilter,
  server
})

export default todoApp