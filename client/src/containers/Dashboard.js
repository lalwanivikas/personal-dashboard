import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
