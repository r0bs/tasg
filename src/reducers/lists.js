import { RECEIVE_TASKLISTS } from '../actions'

const tasklists = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_TASKLISTS:
        return {
            all: [ ...state, ...action.tasklists ],
            default: action.tasklists[0]
        }
    default:
        return state
  }
}

export default tasklists