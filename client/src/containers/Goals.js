import { connect } from 'react-redux'
import Goals from '../components/Goals'
import { fetchTodos, createTodo, editTodo, deleteTodo } from '../actions'

function mapStateToProps(state) {
  const { todosByView } = state
  return {
    todosByView
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTodos  : view => dispatch(fetchTodos(view)),
    createTodo  : todo => dispatch(createTodo(todo)),
    editTodo    : (id, todo) => dispatch(editTodo(id, todo)),
    deleteTodo  : (id, category) => dispatch(deleteTodo(id, category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goals)
