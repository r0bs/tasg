import {TOGGLE_MENU} from '../actions/navigation'

const menuToggled = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return !state
    default:
      return state
  }
}

export default menuToggled
