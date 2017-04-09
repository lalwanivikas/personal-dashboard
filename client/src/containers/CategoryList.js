import { connect } from 'react-redux'
import CategoryList from '../components/CategoryList'
import { setView, fetchTodos, createTodo, editTodo, deleteTodo } from '../actions'

function mapStateToProps(state) {
  const { todosByView, activeView } = state
  return {
    todosByView,
    activeView
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setView     : view => dispatch(setView(view)),
    fetchTodos  : view => dispatch(fetchTodos(view)),
    createTodo  : todo => dispatch(createTodo(todo)),
    editTodo    : (id, todo) => dispatch(editTodo(id, todo)),
    deleteTodo  : (id, category) => dispatch(deleteTodo(id, category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
