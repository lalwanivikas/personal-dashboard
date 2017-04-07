import React, { Component, PropTypes } from 'react'
import { Grid, Cell, DataTable, TableHeader } from 'react-mdl'

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
    return (
      <Grid>
        <Cell col={3}></Cell>
        <Cell col={6}>
          <h4>Incomplete tasks</h4>
          <DataTable
            selectable
            shadow={0}
            rowKeyColumn="id"
            rows={
              this.state.items.map(todo => {
                return {id: todo.id, todo: todo.todo_text }
              })
            }
          >
            <TableHeader name="todo" tooltip="Get these items done!" style={{ width: '100%' }}>To Do</TableHeader>
          </DataTable>
        </Cell>
        <Cell col={3}></Cell>
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
