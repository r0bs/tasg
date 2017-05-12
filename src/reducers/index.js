import { combineReducers } from 'redux'
import tasks from './tasks'
import google from './loginstatus'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  tasks,
  visibilityFilter,
  google
})

export default todoApp