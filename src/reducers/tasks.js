import {ADD_TODO, TOGGLE_TODO, REQUEST_TASKS, RECEIVE_TASKS } from '../actions'

const todo = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
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

const starttodos = [
  {id: "123", title: "hallo", status: "needsAction"},
  {id: "12323", title: "ciao", status: "needsAction"},
  {id: "123233", title: "no", status: "needsAction"}
]

const tasks = (state = starttodos, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ]
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