import { getTasks } from './tasks'

const gapi = window.gapi

let nextTaskListId = 0

export const REQUEST_TASKLISTS = "REQUEST_TASKLISTS"
export const RECEIVE_TASKLISTS = "RECEIVE_TASKLISTS"

export const ADD_TASK_LIST = "ADD_TASK_LIST"

export const PROCESS_TASKLIST_CREATION_RESPONSE = "PROCESS_TASKLIST_CREATION_RESPONSE"

export const SET_DEFAULT_LIST = "SET_DEFAULT_LIST"

export function setDefaultList(tasklist) {
  return {
    type: SET_DEFAULT_LIST,
    tasklist
  }
}

export function setDefaultTaskList(tasklist) {
  return (dispatch) => {
    dispatch(setDefaultList(tasklist))
    dispatch(getTasks())
  }
}

export function addTaskListActionCreator(id, title) {
  return {
    type: ADD_TASK_LIST,
    title,
    id,
    syncInProgress: true
  }
}

export function processTasklistCreationResponse(tempId, permanentId) {
  return {
    type: PROCESS_TASKLIST_CREATION_RESPONSE,
    tempId,
    permanentId
  }
}

export function requestTasklists() {
  return {
    type: REQUEST_TASKLISTS,
  }
}

export function receiveTasklists(tasklists) {
  return {
    type: RECEIVE_TASKLISTS,
    tasklists
  }
}


export function addTasklist(title) {
  return (dispatch) => {

    const tempId = "NEWTASKLIST"+nextTaskListId++;
    
    //add new tasklist to list of tasklists
    dispatch(addTaskListActionCreator(tempId, title))

    gapi.client.tasks.tasklists.insert({
      title
    }).then((response)=> {
      const permanentId = JSON.parse(response.body).id
      //exchange temporary with permanent id
      dispatch(processTasklistCreationResponse(tempId, permanentId))
      //set new tasklist as default
      dispatch(setDefaultList(permanentId))
    })

  }
}

export function getTaskLists() {
  return (dispatch) => {

    dispatch(requestTasklists())

    gapi.client.tasks.tasklists.list()
    .then((response)=> {
      const lists = JSON.parse(response.body).items
      dispatch(receiveTasklists(lists))
      dispatch(setDefaultList(lists[0].id))
      dispatch(getTasks())
    })

  }
}