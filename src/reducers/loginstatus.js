import { combineReducers } from 'redux'
import { 
    REQUEST_LOGIN , 
    LOGGED_IN,
    NOT_LOGGED_IN,
    LOGGED_OUT,
    LOGIN_FAILED 
} from '../actions/google'
import {
    REQUEST_TASKS,
    RECEIVE_TASKS,
    CHANGE_TASK, 
    PROCESS_TASK_CREATION_RESPONSE,
    PROCESS_TASK_UPDATE_RESPONSE
} from '../actions/tasks'


const defaultLoginStatusObject = {
    isLoggedIn: false, 
    loginInProgress: false,
    initialLoginStatusChecked: false
}


const loginStatus = (state = defaultLoginStatusObject, action) => {
    switch(action.type) {
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                loginInProgress: true
            })
        case LOGGED_IN:
            return Object.assign({}, state, {
                isLoggedIn: true,
                loginInProgress: false,
                initialLoginStatusChecked: true
            })
        case NOT_LOGGED_IN:
        case LOGGED_OUT:
        case LOGIN_FAILED:
            return Object.assign({}, state, {
                isLoggedIn: false,
                loginInProgress: false,
                initialLoginStatusChecked: true
            })
        default:
            return state;
        }
}

const hasFetchedOnce = (state = false, action) => {
    switch(action.type) {
        case RECEIVE_TASKS:
            return true
        default:
            return state
    }
}

const isFetching = (state = false, action) => {
    switch(action.type) {
        case CHANGE_TASK:
        case REQUEST_TASKS:
            return true
        case PROCESS_TASK_UPDATE_RESPONSE:
        case PROCESS_TASK_CREATION_RESPONSE:
        case RECEIVE_TASKS:
            return false
        default:
            return state
    }
}

export default combineReducers({
    loginStatus,
    isFetching,
    hasFetchedOnce
})