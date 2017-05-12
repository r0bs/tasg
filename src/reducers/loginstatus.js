import { combineReducers } from 'redux'
import { REQUEST_LOGIN , LOGGED_IN, REQUEST_TASKS } from '../actions'


const loginStatus = (state = false, action) => {
    switch(action.type) {
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                loginInProgress: true
            })
        case LOGGED_IN:
            return Object.assign({}, state, {
                loggedIn: true,
                loginInProgress: false
            })
        default:
            return Object.assign({}, state, {
                loggedIn: false,
                loginInProgress: false
            })
        }
}

const isFetching = (state = false, action) => {
    switch(action.type) {
        case REQUEST_TASKS:
            return true
        default:
            return state
    }
}

export default combineReducers({
    loginStatus,
    isFetching
})