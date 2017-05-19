
const gapi = window.gapi

let nextTaskId = 0

export const REQUEST_TASKS = "REQUEST_TASKS"
export const RECEIVE_TASKS = "RECEIVE_TASKS"

export const ADD_TASK = "ADD_TASK"
export const TOGGLE_TASK = "TOGGLE_TASK"

export const EDIT_TASK = "EDIT_TASK"
export const CHANGE_TASK = "CHANGE_TASK"

export const PROCESS_TASK_CREATION_RESPONSE = "PROCESS_TASK_CREATION_RESPONSE"
export const PROCESS_TASK_UPDATE_RESPONSE = "PROCESS_TASK_UPDATE_RESPONSE"

//GETTING

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

//GETTING ASYNC

export function getTasks(tasklist) {
    return (dispatch, getState) => {

      tasklist = !tasklist ? getState().tasklists.find(l => l.default).id : tasklist

      dispatch(requestTasks(tasklist))

      gapi.client.tasks.tasks.list({
        'tasklist': tasklist
      }).then((response)=> {  
        dispatch(receiveTasks(tasklist, JSON.parse(response.body).items))
      })
    }
}


//CREATION

export function addTaskToList(id, title, due) {
  return {
    type: ADD_TASK,
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


//CREATION ASYNC

export function addTask(title, date, tasklist) {
  
  return (dispatch, getState) => {

    tasklist = !tasklist ? getState().tasklists.find(l => l.default).id : tasklist

    const tempId = "NEWTASK"+nextTaskId++;
    const due = date.format("YYYY-MM-DD") + "T00:00:00.000Z";

    dispatch(addTaskToList(tempId, title, due))

    // this is an ungly hack! checks wether user is signed in to google
    // if not, dispatches task update action as if server repsponded
    // and returns form the action creator
    if(!getState().server.loginStatus.isLoggedIn) {
      return dispatch(processTaskCreationResponse(tempId, tempId))
    }

    gapi.client.tasks.tasks.insert({
      tasklist,
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

//UPDATING


export const toggleTask = (id) => ({
  type: TOGGLE_TASK,
  id
})

export function editTaskInList(taskId, prop, value) {
  return {
    type: CHANGE_TASK,
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

//UPDATING ASYNC

export function changeTask(taskId, prop, value, tasklist) {
  
  return (dispatch, getState) => {

    tasklist = !tasklist ? getState().tasklists.find(l => l.default).id : tasklist

    if(prop === "due") {
      value = value.format("YYYY-MM-DD") + "T00:00:00.000Z";
    }
    //dispatch event to add flag for in edit
    dispatch(editTaskInList(taskId, prop, value))

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
      dispatch(processTaskUpdateResponse(taskId, prop, value))
    })

    // TODO: fehlerbehandlung eibauen!
    // TODO: timeout einbauen!

  }
}


