import {DISCOVERY_DOCS, CLIENT_ID, SCOPES} from './credentials.js'


export default class GoogleApi {

    constructor() {
        this.gapi = window.gapi;
        this.isSignedIn = false;
    }

    startGoogleThing() {
        this.gapi.load('client:auth2', this.initClient.bind(this))
    }

    isUserSignedIn() {
        return this.isSignedIn;
    }

    initClient() {
        // Initialize the client with API key and People API, and initialize OAuth with an
        // OAuth 2.0 client ID and scopes (space delimited string) to request access.
        this.gapi.client.init({
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPES
        }).then(()=> {
            // Listen for sign-in state changes.
            this.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

            // Handle the initial sign-in state.
            this.updateSigninStatus(this.gapi.auth2.getAuthInstance().isSignedIn.get());

        });
    }

    updateSigninStatus(isSignedIn) {
        // When signin status changes, this function is called.
        // If the signin status is changed to signedIn, we make an API call.
        if (isSignedIn) {
            console.info("user is signed in")
            this.isSignedIn = true;

        } else {
            console.warn("user is not signed in")

            this.gapi.auth2.getAuthInstance().signIn();
            
        }
    }

    getTaskList(taskListId= "MTIwMTcwMjE0MDIyNjI5MDg4ODE6MDow", factor = 1) {

        if(this.isSignedIn) {
            return new Promise((resolve, reject)=> {
                this.gapi.client.tasks.tasks.list({
                    'maxResults': 999999,
                    'tasklist': taskListId
                }).then((data)=> {
                    resolve(data);
                })
            })
        } else {
            //if user isn't signed in retry in increasing intervals untill promise is returned
            setTimeout(()=>{this.getTaskList(taskListId, factor*1.5)}, 200*factor)
        }  
                 
    }
    
}