import { combineReducers } from 'redux'
import { REQUEST_TODOS, RECEIVE_TODOS, SET_VIEW, CREATE_TODO, EDIT_TODO, DELETE_TODO } from '../actions'

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
    case CREATE_TODO:
      return Object.assign({}, state, {
        isFetching: true
      })
    case EDIT_TODO:
      return Object.assign({}, state, {
        isFetching: true
      })
    case DELETE_TODO:
      return Object.assign({}, state, {
        isFetching: true
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
