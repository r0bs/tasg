# tasg

**Production version / Demo: [tasg.one](https://tasg.one)**

tasg is a task managment tool build with React and Redux. Users can save tasks to their Google account and manage them with tasg or any compatible softwares, also interchangeably.

## Setup

### Build
Clone the repository. Within the main directory run:

```sh
npm i &&
npm run setup:theme
```
### Configure

In order to save tasks to Google an API key needs to be created in the [Google API Console](https://console.developers.google.com/apis). After creation run:

```sh
npm run setup:credentials
```

and copy the client id into `src/gapi/credentials.json`. The file should look like this:

```js
{
    "CLIENT_ID": "73s324fs6067610-1e6q66ch255685meb7cs4679ojgbcu3u723.apps.googleusercontent.com",
    "DISCOVERY_DOCS": ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
    "SCOPES": "https://www.googleapis.com/auth/tasks"
}
```

## Run

This app is build with [create-react-app](https://github.com/facebook/create-react-app) and uses it's local dev server. It can be started with:

```sh
npm start
```