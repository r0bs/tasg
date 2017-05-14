import {DISCOVERY_DOCS, CLIENT_ID, SCOPES} from '../gapi/credentials.js'
import moment from 'moment'

const gapi = window.gapi

let nextTodoId = 0

export const REQUEST_TASKS = "REQUEST_TASKS"
export const RECEIVE_TASKS = "RECEIVE_TASKS"

export const ADD_TODO = "ADD_TODO"
export const EDIT_TASK = "EDIT_TASK"
export const TOGGLE_TODO = "TOGGLE_TODO"
export const CHANGE_TODO = "CHANGE_TODO"
export const PROCESS_TASK_CREATION_RESPONSE = "PROCESS_TASK_CREATION_RESPONSE"
export const PROCESS_TASK_UPDATE_RESPONSE = "PROCESS_TASK_UPDATE_RESPONSE"

export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER"

export const REQUEST_LOGIN = "REQUEST_LOGIN"
export const LOGGED_IN = "LOGGED_IN"

export function requestLogin() {
  return {
    type: REQUEST_LOGIN
  }
}

export function loggedIn() {
  return {
    type: LOGGED_IN
  }
}

export function requestTasks(listId) {
  return {
    type: REQUEST_TASKS,
    listId
  }
}

export function receiveTasks(listId, tasks) {
  return {
    type: RECEIVE_TASKS,
    listId,
    tasks
  }
}

export function addTodoToList(id, title, due) {
  return {
    type: ADD_TODO,
    id,
    status: "needsAction",
    title,
    due,
    syncInProgress: true
  }
}

export function processTaskCreationResponse(tempId, permanentId) {
  return {
    type: PROCESS_TASK_CREATION_RESPONSE,
    tempId,
    permanentId
  }
}

export function editTodoInList(taskId, prop, value) {
  return {
    type: CHANGE_TODO,
    id: taskId,
    [prop]: value,
    syncInProgress: true
  }
}

export function processTaskUpdateResponse(taskId, prop, value) {
  return {
    type: PROCESS_TASK_UPDATE_RESPONSE,
    id: taskId,
    [prop]: value
  }
}

export const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id
})

export function changeTask(taskId, prop, value, tasklist = "MTIwMTcwMjE0MDIyNjI5MDg4ODE6MDow") {
  
  return (dispatch) => {
    //dispatch event to add flag for in edit
    dispatch(editTodoInList(taskId, prop, value))

    window.gapi.client.tasks.tasks.patch({
        tasklist,
        task: taskId,
        [prop]: value
    }).then(()=> {
      //dispatch event to remove flag and update view
      dispatch(processTaskUpdateResponse(taskId, prop, value))
    })

    // TODO: fehlerbehandlung eibauen!

    // TODO: timeout einbauen!

  }
}

export function addTodo(title, date, listId = "MTIwMTcwMjE0MDIyNjI5MDg4ODE6MDow") {
  
  return (dispatch) => {

    const tempId = "NEWTASK"+nextTodoId++;
    const due = date.format("YYYY-MM-DD") + "T00:00:00.000Z";

    dispatch(addTodoToList(tempId, title, due))

    gapi.client.tasks.tasks.insert({
      tasklist: listId,
      title: title,
      due: due
    }).then((response)=>{

      const permanentId = JSON.parse(response.body).id;

      dispatch(processTaskCreationResponse(tempId, permanentId))
    })

    // TODO: fehlerbehandlung eibauen!

    // TODO: timeout einbauen!

  }
}

export function loginToGoogle() {
  return (dispatch) => {

    dispatch(requestLogin())

    gapi.load('client:auth2', ()=>{
      gapi.client.init({
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPES
        }).then(()=> {
            dispatch(loggedIn())
        })

    })
  
  }
}

export function getTaskList(listId) {

    return (dispatch) => {
      dispatch(requestTasks(listId))

      gapi.client.tasks.tasks.list({
        'tasklist': listId
      }).then((response)=> {  
        dispatch(receiveTasks(listId, JSON.parse(response.body).items))
      })
    }
}


export function getTaskListIfLoggedInAlready() {

}