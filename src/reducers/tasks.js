import {ADD_TODO, TOGGLE_TODO, RECEIVE_TASKS, PROCESS_TASK_CREATION_RESPONSE } from '../actions'

const todo = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...action,
        status: "needsAction",
        syncInProgress: action.syncInProgress
      }
    case PROCESS_TASK_CREATION_RESPONSE:
      if (state.id === action.tempId) {
        return {
          ...state,
          id: action.permanentId,
          syncInProgress: false
        }
      }
      return state;

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

const starttodos = [
  {id: "123233", title: " ", status: "needsAction"}
]

const tasks = (state = starttodos, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ]
    case PROCESS_TASK_CREATION_RESPONSE:
      return state.map(t =>
        todo(t, action)
      )
    case TOGGLE_TODO:
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