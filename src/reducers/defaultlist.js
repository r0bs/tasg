import {
    SET_DEFAULT_LIST, 
    PROCESS_TASKLIST_CREATION_RESPONSE,
    RECEIVE_TASKLISTS
} from '../actions'


const defaultlist = (state = "templist" , action) => {
    switch (action.type) {           
        case SET_DEFAULT_LIST:
            return action.tasklist
            
        case RECEIVE_TASKLISTS:
            return action.tasklists[0].id
        default:
            return state
    }
}

export default defaultlist