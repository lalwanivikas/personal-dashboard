import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Cell, Textfield } from 'react-mdl'
import ToDoItems from './ToDoItems'

export class CategoryList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    this.props.fetchTodos(this.props.category)
  }

  componentWillReceiveProps(newProps) {
    if(newProps.category !== this.props.category) {
      this.props.fetchTodos(newProps.category)
    }
    this.setState({
      items: newProps.todosByView.items
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
            onChange={() => {}}
            label="Add new item here"
            floatingLabel
            style={{width: '100%'}}
          />
          {
            incompleteTasks.length
            ? <div>
                <h4>Incomplete tasks</h4>
                <ToDoItems items={incompleteTasks} />
              </div>
            : ''
          }
          {
            completedTasks.length
            ? <div>
                <h4>Completed tasks</h4>
                <ToDoItems items={completedTasks} />
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
  fetchTodos  : PropTypes.func.isRequired
}

export default CategoryList

// <DataTable
//   selectable
//   shadow={0}
//   rowKeyColumn="id"
//   rows={
//     this.state.items.map(todo => {
//       return {id: todo.id, todo: todo.todo_text }
//     })
//   }
// >
//   <TableHeader name="todo" tooltip="Get these items done!" style={{ width: '100%' }}>To Do</TableHeader>
// </DataTable>
