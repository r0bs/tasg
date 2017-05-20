import {APPLY_SEARCH} from '../actions/filter'

const search = (state = '', action) => {
  switch (action.type) {
    case APPLY_SEARCH:
      return action.searchterm
    default:
      return state
  }
}

export default search
