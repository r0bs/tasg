import "babel-polyfill"
import moment from "moment"

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

export const CLEAR_FINISHED_TASKS = "CLEAR_FINISHED_TASKS"

export const UPDATE_OVERDUE_TASKS = "UPDATE_OVERDUE_TASKS"

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

const getAllTasks = async (tasklist, items, nextPageToken) => {

  const response = await gapi.client.tasks.tasks.list({
    tasklist: tasklist,
    pageToken: nextPageToken
  });

  if (response.result.nextPageToken) {
    return getAllTasks(tasklist, response.result.items, response.result.nextPageToken)
  }

  return [...response.result.items, ...items]
}

export function getTasks(tasklist) {
    return (dispatch, getState) => {

      tasklist = !tasklist ? getState().tasklists.find(l => l.default).id : tasklist

      dispatch(requestTasks(tasklist))

      getAllTasks(tasklist, []).then((items) => {
        dispatch(receiveTasks(tasklist, items));
      });
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

export const clearFinished = () => ({
  type: CLEAR_FINISHED_TASKS
})

export function clearFinishedTasks(tasklist) {
  return (dispatch, getState) => {
    tasklist = !tasklist ? getState().tasklists.find(l => l.default).id : tasklist
    
    gapi.client.tasks.tasks.clear({
      tasklist
    })
    .then( () => dispatch(clearFinished() ) )
  }
}

export const updateOverdue = () => ({
  type: UPDATE_OVERDUE_TASKS
})

export function updateOverdueTasks(tasks) {
  return (dispatch, getState) => {

    tasks.filter(task => {
      return task.status === "needsAction";
    }).filter(task => {
      return moment(task.due, moment.ISO_8601).isBefore(moment(), "d") 
    }).map(task => {
        return dispatch(changeTask(task.id, "due", moment()));
    });
    
  }
}

//UPDATING ASYNC

export function changeTask(taskId, prop, value, tasklist) {
  
  return (dispatch, getState) => {

    tasklist = !tasklist ? getState().tasklists.find(l => l.default).id : tasklist

    console.log("sdf",taskId);

    if(prop === "due") {
      value = value.format("YYYY-MM-DD") + "T00:00:00.000Z";
    }
    //dispatch event to add flag for in edit
    dispatch(editTaskInList(taskId, prop, value))

    // this is an ugly hack! checks wether user is signed in to google
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


