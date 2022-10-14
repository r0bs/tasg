import React from 'react'
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import AppLoader from './containers/AppLoader'
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker'

import './theme/build/index.css'

const loggerMiddleware = createLogger()

let middleware = [thunkMiddleware]

if(process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, loggerMiddleware]
}

const store = createStore(
  reducer,
  applyMiddleware(
    ...middleware
  )
)

ReactDOM.render(
  <Provider store={store}>
    <AppLoader />
  </Provider>, 
  document.getElementById('root')
)

registerServiceWorker()

