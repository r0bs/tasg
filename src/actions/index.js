import {DISCOVERY_DOCS, CLIENT_ID, SCOPES} from '../gapi/credentials.js'

const gapi = window.gapi

let nextTodoId = 0

export const REQUEST_TASKS = "REQUEST_TASKS"
export const RECEIVE_TASKS = "RECEIVE_TASKS"

export const ADD_TODO = "ADD_TODO"
export const TOGGLE_TODO = "TOGGLE_TODO"

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

export const addTodo = (title) => ({
  type: ADD_TODO,
  id: nextTodoId++,
  status: "needsAction",
  title
})

export const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id
})

export function loginToGoogle() {
  return (dispatch) => {

    dispatch(requestLogin())

    gapi.load('client:auth2', ()=>{
      return gapi.client.init({
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

      return gapi.client.tasks.tasks.list({
        'tasklist': listId
      }).then((response)=> {
        console.log("response", JSON.parse(response.body).items)
  
        dispatch(receiveTasks(listId, JSON.parse(response.body).items))
      })
    }
  
 
}


export function getTaskListIfLoggedInAlready() {

}