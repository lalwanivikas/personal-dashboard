import { combineReducers } from 'redux'
import { REQUEST_TODOS, RECEIVE_TODOS, SET_VIEW } from '../actions'

function activeView(state = '', action) {
  switch (action.type) {
    case SET_VIEW:
      return action.view
    default:
      return state
  }
}

function todosByView(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_TODOS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_TODOS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.todos
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  todosByView,
  activeView
})

export default rootReducer
