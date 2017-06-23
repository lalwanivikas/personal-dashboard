import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './components/App'

require('./material.css')
require('./material.js')

const initialState = {
  todosByView: {
    isFetching: false,
    items: []
  },
  activeView: ''
}

const store = configureStore(initialState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
