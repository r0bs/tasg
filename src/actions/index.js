import {DISCOVERY_DOCS, CLIENT_ID, SCOPES} from '../gapi/credentials.js'

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

export const LOAD_GOOGLE_CLIENT = "LOAD_GOOGLE_CLIENT"
export const CHECK_SIGNIN_STATUS = "CHECK_SIGNIN_STATUS"
export const REQUEST_LOGIN = "REQUEST_LOGIN"
export const LOGGED_IN = "LOGGED_IN"
export const LOGGED_OUT = "LOGGED_OUT"
export const LOGIN_FAILED = "LOGIN_FAILED"


export function loadGoogleClient() {
  return {
    type: LOAD_GOOGLE_CLIENT
  }
}

export function checkSigninStatus() {
  return {
    type: CHECK_SIGNIN_STATUS
  }
}

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

export function loggedOut() {
  return {
    type: LOGGED_OUT
  }
}

export function loginFailed() {
  return {
    type: LOGIN_FAILED
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
  
  return (dispatch, getState) => {

    if(prop === "due") {
      value = value.format("YYYY-MM-DD") + "T00:00:00.000Z";
    }
    //dispatch event to add flag for in edit
    dispatch(editTodoInList(taskId, prop, value))

    // this is an ungly hack! checks wether user is signed in to google
    // if not, dispatches task update action as if server repsponded
    // and returns form the action creator
    if(!getState().server.loginStatus.isLoggedIn) {
      dispatch(processTaskUpdateResponse(taskId, prop, value))
      return
    }

    gapi.client.tasks.tasks.patch({
        tasklist,
        task: taskId,
        [prop]: value,
        completed: null
    }).then(()=> {
      //dispatch event to remove flag and update view
      console.log(!getState().server.loginStatus.isLoggedIn)
      dispatch(processTaskUpdateResponse(taskId, prop, value))
    })

    // TODO: fehlerbehandlung eibauen!
    // TODO: timeout einbauen!

  }
}

export function addTodo(title, date, listId = "MTIwMTcwMjE0MDIyNjI5MDg4ODE6MDow") {
  
  return (dispatch, getState) => {

    const tempId = "NEWTASK"+nextTodoId++;
    const due = date.format("YYYY-MM-DD") + "T00:00:00.000Z";

    dispatch(addTodoToList(tempId, title, due))

    // this is an ungly hack! checks wether user is signed in to google
    // if not, dispatches task update action as if server repsponded
    // and returns form the action creator
    if(!getState().server.loginStatus.isLoggedIn) {
      return dispatch(processTaskCreationResponse(tempId, tempId))
    }

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

export function checkIfUserIsSignedInWithGoogle() {
  return (dispatch) => {
    dispatch(checkSigninStatus())
    if(gapi.auth2.getAuthInstance().isSignedIn.get()) {
      dispatch(loggedIn())
    }
  }
}

export function registerSignInStatusListener() {
  return (dispatch) => {
      // Register Listener for sign in status changes
      gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
        if(isSignedIn) {
          dispatch(loggedIn())
          //dispatch(getTaskList("MTIwMTcwMjE0MDIyNjI5MDg4ODE6MDow"))
        } else {
          dispatch(loggedOut())
        }
      })
  }
}


export function laodGoogleClientAsync() {
  return (dispatch) => {

    dispatch(loadGoogleClient())

    gapi.load('client:auth2', ()=>{
      gapi.client.init({
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPES
        }).then(() => {
          dispatch(checkIfUserIsSignedInWithGoogle())
          dispatch(registerSignInStatusListener())
        })

    })
    
  }
}

export function loginToGoogle() {
  return (dispatch) => {
    dispatch(requestLogin())
    gapi.auth2.getAuthInstance().signIn().then(() => {
      //dispatch(loggedIn())
    })
  }
}

export function logoutOfGoogle() {
  return(dispatch) => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      //dispatch(loggedOut())
    });
    
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