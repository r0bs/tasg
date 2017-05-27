import { combineReducers } from 'redux'
import tasklists from './lists'
import tasks from './tasks'
import server from './server'
import search from './search'
import menuToggled from './navigation'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  tasklists,
  tasks,
  visibilityFilter,
  search,
  server,
  menuToggled
})

export default todoApp