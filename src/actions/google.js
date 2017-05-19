import {getTaskLists} from './tasklists'

import {DISCOVERY_DOCS, CLIENT_ID, SCOPES} from '../gapi/credentials.js'

const gapi = window.gapi

export const LOAD_GOOGLE_CLIENT = "LOAD_GOOGLE_CLIENT"
export const CHECK_SIGNIN_STATUS = "CHECK_SIGNIN_STATUS"
export const REQUEST_LOGIN = "REQUEST_LOGIN"
export const LOGGED_IN = "LOGGED_IN"
export const NOT_LOGGED_IN = "NOT_LOGGED_IN"
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

export function notloggedIn() {
  return {
    type: NOT_LOGGED_IN
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

export function checkIfUserIsSignedInWithGoogle() {
  return (dispatch) => {
    dispatch(checkSigninStatus())
    if(gapi.auth2.getAuthInstance().isSignedIn.get()) {
      dispatch(loggedIn())
      dispatch(getTaskLists())
    } else {
      dispatch(notloggedIn())
    }
  }
}

export function registerSignInStatusListener() {
  return (dispatch) => {
      // Register Listener for sign in status changes
      gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
        if(isSignedIn) {
          dispatch(loggedIn())
          dispatch(getTaskLists())
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
    gapi.auth2.getAuthInstance().signIn()
  }
}

export function logoutOfGoogle() {
  return(dispatch) => {
    gapi.auth2.getAuthInstance().signOut()
  }
}