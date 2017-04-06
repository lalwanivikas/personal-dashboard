import fetch from 'isomorphic-fetch'

export const REQUEST_TODOS = 'REQUEST_TODOS'
export const RECEIVE_TODOS = 'RECEIVE_TODOS'
export const SET_VIEW = 'SET_VIEW'
// export const ADD_TODO = 'ADD_TODO'
// export const EDIT_TODO = 'EDIT_TODO'
// export const DELETE_TODO = 'DELETE_TODO'

export function setView(view) {
  return {
    type: SET_VIEW,
    view
  }
}

function requestTodos(view) {
  return {
    type: REQUEST_TODOS,
    view
  }
}

function receiveTodos(view, json) {
  return {
    type: RECEIVE_TODOS,
    view,
    todos: json.data
  }
}



export function fetchTodos(view) {
  return dispatch => {
    dispatch(requestTodos(view))
    return fetch(`http://localhost:3000/api/items/${view}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTodos(view, json)))
  }
}
