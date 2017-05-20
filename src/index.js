import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'taskinator-theme/build/index.css'

const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)



