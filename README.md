#tasg

**Production version / Demo: [tasg.one](https://tasg.one)**

tasg is a task managment tool build with React and Redux. Users can save tasks to their Google account and manage them with tasg or any compatible softwares, also interchangeably.

## Setup

### Build
Clone the repository. Within the main directory run:

```
npm i &&
npm run setup:theme
```
### Configure

In order to save tasks to Google an API key needs to be created in the [Google API Console](https://console.developers.google.com/apis). After creation, run:

```
npm run setup:credentials
```

and copy the client id into `src/gapi/credentials.js´:

```
export const CLIENT_ID = '*7323423061610-1e8q74gh27885meb7cs234ojgbcu3u73.apps.googleusercontent.com*';
export const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"];
export const SCOPES = 'https://www.googleapis.com/auth/tasks';
```

### Run

This app is build with [create-react-app](https://github.com/facebook/create-react-app) and uses their local dev server. It can be started with:

```
npm start
```