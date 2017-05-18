import { combineReducers } from 'redux'
import tasklists from './lists'
import defaultlist from './defaultlist'
import tasks from './tasks'
import server from './loginstatus'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  tasklists,
  tasks,
  visibilityFilter,
  defaultlist,
  server
})

export default todoApp