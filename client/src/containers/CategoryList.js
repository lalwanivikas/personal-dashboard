import { connect } from 'react-redux'
import CategoryList from '../components/CategoryList'
import { setView, fetchTodos } from '../actions'

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
    fetchTodos  : view => dispatch(fetchTodos(view))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
