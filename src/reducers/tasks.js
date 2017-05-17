import {
  ADD_TODO, 
  TOGGLE_TODO, 
  RECEIVE_TASKS, 
  PROCESS_TASK_CREATION_RESPONSE, 
  PROCESS_TASK_UPDATE_RESPONSE,
  CHANGE_TODO,
  SET_DEFAULT_LIST
 } from '../actions'

const todo = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        ...action
      }
    case CHANGE_TODO:
      if (state.id !== action.id) {
          return state
        }
      return {
        ...state,
        ...action
      }
    case PROCESS_TASK_CREATION_RESPONSE:
      if (state.id !== action.tempId) {
        return state
      }
      return {
          ...state,
          id: action.permanentId,
          syncInProgress: false
        }
    case PROCESS_TASK_UPDATE_RESPONSE:
      if (state.id !== action.id) {
        return state
      }
      return {
        ...state,
        ...action,
        syncInProgress: false
      }
    case TOGGLE_TODO:
      if (state.id !== action.id) {
        return state
      }
      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

const tasks = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ]
    case SET_DEFAULT_LIST:
      return []
    case PROCESS_TASK_CREATION_RESPONSE:
    case PROCESS_TASK_UPDATE_RESPONSE:
    case TOGGLE_TODO:
    case CHANGE_TODO:
      return state.map(t =>
        todo(t, action)
      )
    case RECEIVE_TASKS:
      return [
        ...state,
        ...action.tasks
      ]
    default:
      return state
  }
}

export default tasks