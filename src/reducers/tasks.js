import {
  ADD_TASK, 
  TOGGLE_TASK, 
  RECEIVE_TASKS, 
  PROCESS_TASK_CREATION_RESPONSE, 
  PROCESS_TASK_UPDATE_RESPONSE,
  CHANGE_TASK,
  REMOVE_FINISHED_TASKS
 } from '../actions/tasks'
 import { LOGGED_OUT } from '../actions/google'
 import { SET_DEFAULT_LIST } from '../actions/tasklists'

const task = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        ...action
      }
    case CHANGE_TASK:
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
    case TOGGLE_TASK:
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
    case ADD_TASK:
      return [
        ...state,
        task(undefined, action)
      ]
    case LOGGED_OUT:
    case SET_DEFAULT_LIST:
      return []
    case PROCESS_TASK_CREATION_RESPONSE:
    case PROCESS_TASK_UPDATE_RESPONSE:
    case TOGGLE_TASK:
    case CHANGE_TASK:
      return state.map(t =>
        task(t, action)
      )
    case REMOVE_FINISHED_TASKS:
      return state.filter(task => task.status !== "completed");
    case RECEIVE_TASKS:
      const tasks = action.tasks ? action.tasks : [];
      return [
        ...state,
        ...tasks
      ]
    default:
      return state
  }
}

export default tasks