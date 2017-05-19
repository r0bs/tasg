import { RECEIVE_TASKLISTS, 
    SET_DEFAULT_LIST, 
    ADD_TASK_LIST, 
    PROCESS_TASKLIST_CREATION_RESPONSE 
} from '../actions/tasklists'
import { LOGGED_OUT } from '../actions/google'

const list = (state, action) => {
  switch (action.type) {
    case ADD_TASK_LIST:
        return {
            ...state,
            ...action
        }
    case SET_DEFAULT_LIST:
        if (state.id !== action.tasklist) {
            return {
                ...state,
                default: false
            }
        }
        return {
            ...state,
            default: true
        }
    case PROCESS_TASKLIST_CREATION_RESPONSE:
      if (state.id !== action.tempId) {
        return state
      }
      return {
          ...state,
          id: action.permanentId,
          syncInProgress: false
        }
    default:
      return state
  }
}

const initialTasklistStateArray = [{id: "localtemplist", default: true, title: "Ephemeral Tasklist"}]

const tasklists = (state = initialTasklistStateArray, action) => {
    switch (action.type) {
        case ADD_TASK_LIST:
            return [
                ...state,
                list(undefined, action)
            ]
        case SET_DEFAULT_LIST:
        case PROCESS_TASKLIST_CREATION_RESPONSE:
            return state.map(t =>
                list(t, action)
            )
        case RECEIVE_TASKLISTS:
            return [
                ...action.tasklists
            ]
        case LOGGED_OUT: 
            return initialTasklistStateArray
        default:
            return state
    }
}

export default tasklists