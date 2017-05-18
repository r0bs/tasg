import { RECEIVE_TASKLISTS, SET_DEFAULT_LIST } from '../actions'

const defaultStateObject = { all: [], default: { id: "templist"} }

const tasklists = (state = defaultStateObject, action) => {
  switch (action.type) {
    case RECEIVE_TASKLISTS:
        return {
            all: [ ...action.tasklists ],
            default: action.tasklists[0]
        }
    case SET_DEFAULT_LIST:
        return {
            ...state,
            default: state.all.find(list => {
                return list.id === action.tasklist
            })
        }
    default:
        return state
  }
}

export default tasklists