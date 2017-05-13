import {DISCOVERY_DOCS, CLIENT_ID, SCOPES} from '../gapi/credentials.js'
import moment from 'moment'

const gapi = window.gapi

let nextTodoId = 0

export const REQUEST_TASKS = "REQUEST_TASKS"
export const RECEIVE_TASKS = "RECEIVE_TASKS"

export const ADD_TODO = "ADD_TODO"
export const EDIT_TASK = "EDIT_TASK"
export const TOGGLE_TODO = "TOGGLE_TODO"
export const PROCESS_TASK_CREATION_RESPONSE = "PROCESS_TASK_CREATION_RESPONSE"

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

export const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id
})

export function addTodo(title, listId = "MTIwMTcwMjE0MDIyNjI5MDg4ODE6MDow") {
  return (dispatch) => {

    const tempId = "NEWTASK"+nextTodoId++;
    const due = moment().format("YYYY-MM-DD") + "T00:00:00.000Z";

    dispatch(addTodoToList(tempId, title, due))

    gapi.client.tasks.tasks.insert({
      tasklist: listId,
      title: title,
      due: due
    }).then((response)=>{

      const permanentId = JSON.parse(response.body).id;

      dispatch(processTaskCreationResponse(tempId, permanentId))
    })


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