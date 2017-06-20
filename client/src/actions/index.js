import fetch from 'isomorphic-fetch'

export const REQUEST_TODOS = 'REQUEST_TODOS'
export const RECEIVE_TODOS = 'RECEIVE_TODOS'
export const SET_VIEW = 'SET_VIEW'
export const CREATE_TODO = 'CREATE_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const DELETE_TODO = 'DELETE_TODO'

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
    return fetch(`API_ENDPOINT/api/items/${view}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTodos(view, json)))
  }
}

export function createTodo(todo) {
  return dispatch => {
    return fetch(`API_ENDPOINT/api/items/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    .then(() => dispatch(fetchTodos(todo.category)))
  }
}

export function editTodo(id, todo) {
  return dispatch => {
    return fetch(`API_ENDPOINT/api/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    .then(() => dispatch(fetchTodos(todo.category)))
  }
}

export function deleteTodo(id, category) {
  return dispatch => {
    return fetch(`API_ENDPOINT/api/items/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => dispatch(fetchTodos(category)))
  }
}
