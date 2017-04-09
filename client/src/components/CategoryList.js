import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Cell, Textfield } from 'react-mdl'
import ToDoItems from './ToDoItems'

export class CategoryList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      newTodo: ''
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log('do validate');
      this.props.createTodo({
        "category": this.props.category,
        "todo_text": this.state.newTodo,
        "todo_status": "FALSE",
        "created_at": "now()",
        "updated_at": null,
        "target_date": null
      })
      this.setState({ newTodo: '' })
    }
  }

  componentDidMount() {
    this.props.fetchTodos(this.props.category)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.category !== this.props.category) {
      this.props.fetchTodos(nextProps.category)
    }
    this.setState({
      items: nextProps.todosByView.items
    })
  }

  render() {
    const incompleteTasks = this.state.items.filter(item => item.todo_status === false)
    const completedTasks = this.state.items.filter(item => item.todo_status === true)
    return (
      <Grid>
        <Cell col={2}></Cell>
        <Cell col={8}>
          <Textfield
            onKeyUp={(e) => this.handleKeyPress(e)}
            onChange={(e) => this.setState({ newTodo: e.target.value})}
            value={this.state.newTodo}
            label="Add new item here"
            floatingLabel
            style={{width: '100%'}}
          />
          {
            incompleteTasks.length
            ? <div>
                <h4>Incomplete tasks</h4>
                <ToDoItems
                  items={incompleteTasks}
                  editTodo={(id, todo) => this.props.editTodo(id, todo)}
                  deleteTodo={(id, category) => this.props.deleteTodo(id, category)}
                />
              </div>
            : ''
          }
          {
            completedTasks.length
            ? <div>
                <h4>Completed tasks</h4>
                <ToDoItems
                  items={completedTasks}
                  editTodo={(id, todo) => this.props.editTodo(id, todo)}
                  deleteTodo={(id, category) => this.props.deleteTodo(id, category)}
                />
              </div>
            : ''
          }
        </Cell>
        <Cell col={2}></Cell>
      </Grid>
    )
  }
}


CategoryList.propTypes = {
  category    : PropTypes.string.isRequired,
  activeView  : PropTypes.string.isRequired,
  todosByView : PropTypes.object.isRequired,
  setView     : PropTypes.func.isRequired,
  fetchTodos  : PropTypes.func.isRequired,
  createTodo  : PropTypes.func.isRequired,
  editTodo    : PropTypes.func.isRequired,
  deleteTodo  : PropTypes.func.isRequired
}

export default CategoryList
